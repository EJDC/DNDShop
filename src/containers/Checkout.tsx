import React, { useState, useEffect } from "react";
import DeliveryPaymentOptions from "../components/forms/DeliveryPaymentOptions";
import { DeliveryOption, PaymentOption } from "../servicesBackend";
import CustomerInfoForm, {
  CustomerInfo,
} from "../components/forms/CustomerInfoForm";
import TotalSummary from "../components/summaries/TotalsSummary";
import CheckoutSelections from "../components/forms/CheckoutSelections";

export interface OrderInfo {
  grandTotal: number;
  subtotal: number;
  deliveryMethod: string;
  deliveryFee: number;
  paymentMethod: string;
  paymentFee: number;
}

interface CheckoutProps {
  selectedServices: { [key: string]: number };
  setSelectedServices: (services: { [key: string]: number }) => void;
  setCheckoutComplete: React.Dispatch<React.SetStateAction<boolean>>;
  setOrderInfo: React.Dispatch<React.SetStateAction<OrderInfo | null>>;
  setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerInfo>>;
  customerInfo: CustomerInfo;
}

const Checkout: React.FC<CheckoutProps> = ({
  selectedServices,
  setSelectedServices,
  setCheckoutComplete,
  setOrderInfo,
  setCustomerInfo,
  customerInfo,
}) => {
  //STATE - Selected Payment/Delivery Option or null.
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<PaymentOption | null>(null);
  const [selectedDeliveryOption, setSelectedDeliveryOption] =
    useState<DeliveryOption | null>(null);
  const [calculatedSubtotal, setCalculatedSubtotal] = useState<number>(0);
  const [calculatedGrandTotal, setCalculatedGrandTotal] = useState<number>(0);

  useEffect(() => {
    const calculateSubtotal = async (): Promise<number> => {
      let subtotal = 0;

      for (const [url, quantity] of Object.entries(selectedServices)) {
        try {
          const response = await fetch(`https://www.dnd5eapi.co${url}`);
          const itemDetail = await response.json();

          if (itemDetail && itemDetail.cost && itemDetail.cost.unit) {
            const unit = itemDetail.cost.unit;
            const cost = itemDetail.cost.quantity;

            let convertedCost = 0;

            switch (unit) {
              case "pp":
                convertedCost = cost * 10;
                break;
              case "gp":
                convertedCost = cost;
                break;
              case "sp":
                convertedCost = cost * 0.1;
                break;
              case "cp":
                convertedCost = cost * 0.01;
                break;
              default:
                break;
            }

            subtotal += convertedCost * quantity;
          }
        } catch (error) {
          console.error(`Error fetching item details for ${url}:`, error);
        }
      }

      return subtotal;
    };

    const fetchSubtotal = async () => {
      const subtotal = await calculateSubtotal();
      setCalculatedSubtotal(subtotal);
    };

    fetchSubtotal();
  }, [selectedServices]);


  const calculateDeliveryFee = () => {
    return selectedDeliveryOption ? selectedDeliveryOption.price : 0;
  };

  const calculatePaymentFee = () => {
    return selectedPaymentOption ? selectedPaymentOption.price : 0;
  };

  const calculateGrandTotal = async (): Promise<number> => {
    try {
      const subtotal = calculatedSubtotal; // Use the state value
      const deliveryFee = calculateDeliveryFee();
      const paymentFee = calculatePaymentFee();
      const grandTotal = subtotal + deliveryFee + paymentFee;
      return grandTotal;
    } catch (error) {
      console.error("Error calculating grand total:", error);
      return 0;
    }
  };

  useEffect(() => {
    const calculateAndSetGrandTotal = async () => {
      const total = await calculateGrandTotal();
      setCalculatedGrandTotal(total);
    };

    calculateAndSetGrandTotal();
  }, [calculatedSubtotal]);

  const handlePaymentSelection = (selectedOption: PaymentOption) => {
    setSelectedPaymentOption(selectedOption);
  };

  const handleDeliverySelection = (selectedOption: DeliveryOption) => {
    setSelectedDeliveryOption(selectedOption);
  };

  const handleCustomerInfoChange = (customerData: CustomerInfo) => {
    setCustomerInfo(customerData);
  };

  const handleProceedToPayment = async () => {
    //Create an array with all the keys in the Customer Object for required fields.
    const requiredFields: Array<keyof CustomerInfo> = [
      "characterFirstName",
      "characterLastName",
      "playerName",
      "city",
      "district",
      "partyName",
      "emailAddress",
    ];

    //Create an array by filtering for fields that have a value in them.
    const filledFields = requiredFields.filter(
      (fieldName) => customerInfo[fieldName]
    );
    //Create an array by filtering for fields that have don't have a value in them.
    const missingFields = requiredFields.filter(
      (fieldName) => !customerInfo[fieldName]
    );

    //Show alert if there are exaclty zero filled fields and prevent proceed to checkout.
    if (filledFields.length === 0) {
      alert("Please complete the Your Details section.");
      return;
    }

    //If there's nothing in the missing fields array, proceed to payment.
    if (missingFields.length === 0) {
      const deliveryFee = calculateDeliveryFee();
      const paymentFee = calculatePaymentFee();

      const orderData: OrderInfo = {
        grandTotal: calculatedGrandTotal,
        subtotal: calculatedSubtotal,
        deliveryMethod: selectedDeliveryOption
          ? selectedDeliveryOption.name
          : "",
        deliveryFee,
        paymentMethod: selectedPaymentOption ? selectedPaymentOption.name : "",
        paymentFee,
      };

      const customerData: CustomerInfo = customerInfo;

      setOrderInfo(orderData);
      setCustomerInfo(customerData);
      setCheckoutComplete(true);
    } else {
      //Warn which fields need to be completed.
      alert(`Please all required field(s): ${missingFields.join(", ")}`);
    }
  };

  const calculatedDeliveryFee = calculateDeliveryFee();
  const calculatedPaymentFee = calculatePaymentFee();

  return (
    <main className="container mx-auto px-4 py-8 mt-5 border rounded-lg max-w-xl lg:max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      {/* Main Grid */}
      <div className="lg:flex">
        {/* Left Column for Large Screens */}
        <div className="hidden lg:block lg:w-1/2 lg:pr-4">
          {/* Delivery and Payment Options for Large Screens */}
          <CustomerInfoForm onChange={handleCustomerInfoChange} />
          <DeliveryPaymentOptions
            selectedDeliveryOption={selectedDeliveryOption}
            selectedPaymentOption={selectedPaymentOption}
            handleDeliverySelection={handleDeliverySelection}
            handlePaymentSelection={handlePaymentSelection}
          />
        </div>
        {/* Right Column for Purchase Cards and Subtotal */}
        <div className="lg:w-1/2 lg:pl-4 mt-3">
          <CheckoutSelections
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
          />
          {/* Delivery and Payment Options for Small Screens */}
          <div className="lg:hidden">
            {/* Customer Info and Delivery/Payment Options */}
            <CustomerInfoForm onChange={handleCustomerInfoChange} />
            <DeliveryPaymentOptions
              selectedDeliveryOption={selectedDeliveryOption}
              selectedPaymentOption={selectedPaymentOption}
              handleDeliverySelection={handleDeliverySelection}
              handlePaymentSelection={handlePaymentSelection}
            />
          </div>
          {/* Subtotal, Delivery, Payment, and Grand Total */}
          <TotalSummary
            orderInfo={{
              subtotal: calculatedSubtotal,
              deliveryMethod: "Delivery Fee",
              deliveryFee: calculatedDeliveryFee,
              paymentFee: calculatedPaymentFee,
              grandTotal: calculatedGrandTotal,
            }}
            selectedPaymentOption="Payment Fee"
            paymentFee={calculatedPaymentFee}
          />
        </div>
      </div>
      {/* Back and Proceed to Payment buttons */}
      <div className="flex justify-between px-5 py-8 ">
        <button
          onClick={() => setSelectedServices({})}
          className="btn-back bg-primary text-white px-6 py-3 rounded-lg mt-4"
          aria-label="Back to Service Selection"
        >
          Back
        </button>
        <button
          onClick={handleProceedToPayment}
          className="btn-proceed bg-primary text-white px-6 py-3 rounded-lg mt-4"
          aria-label="Proceed to Payment"
        >
          Proceed to Payment
        </button>
      </div>
    </main>
  );
};

export default Checkout;
