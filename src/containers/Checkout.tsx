import React, { useState } from "react";
import { items } from "../servicesBackend";
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

  //FUNCTION - Calculate Subtotal
  const calculateSubtotal = () => {
    let subtotal = 0;
    Object.entries(selectedServices).forEach(
      ([serviceDescription, quantity]) => {
        const service = items.find(
          (service) => service.itemDescription === serviceDescription
        );
        if (service) {
          subtotal += service.price * quantity;
        }
      }
    );
    return subtotal;
  };

  const calculateDeliveryFee = () => {
    return selectedDeliveryOption ? selectedDeliveryOption.price : 0;
  };

  const calculatePaymentFee = () => {
    return selectedPaymentOption ? selectedPaymentOption.price : 0;
  };

  const calculateGrandTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = calculateDeliveryFee();
    const paymentFee = calculatePaymentFee();
    const grandTotal = subtotal + deliveryFee + paymentFee;
    return grandTotal;
  };

  const handlePaymentSelection = (selectedOption: PaymentOption) => {
    setSelectedPaymentOption(selectedOption);
  };

  const handleDeliverySelection = (selectedOption: DeliveryOption) => {
    setSelectedDeliveryOption(selectedOption);
  };

  const handleCustomerInfoChange = (customerData: CustomerInfo) => {
    setCustomerInfo(customerData);
  };

  const handleProceedToPayment = () => {
    //Create an array with all the keys in the Customer Object for required fields.
    const requiredFields: Array<keyof CustomerInfo> = [
      "firstName",
      "lastName",
      "address1",
      "city",
      "postcode",
      "phoneNumber",
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
      const subtotal = calculateSubtotal();
      const deliveryFee = calculateDeliveryFee();
      const paymentFee = calculatePaymentFee();
      const grandTotal = calculateGrandTotal();

      const orderData: OrderInfo = {
        grandTotal,
        subtotal,
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

  const calculatedSubtotal = calculateSubtotal();
  const calculatedDeliveryFee = calculateDeliveryFee();
  const calculatedPaymentFee = calculatePaymentFee();
  const calculatedGrandTotal = calculateGrandTotal();

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
