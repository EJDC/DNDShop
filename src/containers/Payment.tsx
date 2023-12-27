import React from "react";
import { useState } from "react";
import { items, paymentOptions } from "../servicesBackend";
import { CustomerInfo } from "../components/forms/CustomerInfoForm";
import { OrderInfo } from "./Checkout";
import { AtShopPaymentInfo } from "../components/forms/PaymentAtShopForm";
import { OnlinePaymentInfo } from "../components/forms/OnlinePaymentForm";
import CustomerDetailsSummary from "../components/summaries/CustomerDetailsSummary";
import TotalSummary from "../components/summaries/TotalsSummary";
import OrderSummary from "../components/summaries/OrderSummary";
import PaymentFormWrapper from "../components/forms/PaymentFormWrapper";

export interface BasePaymentInfo {}

export type PaymentInfo = OnlinePaymentInfo | AtShopPaymentInfo | null;

interface PaymentProps {
  selectedServices: { [key: string]: number };
  setCheckoutComplete: React.Dispatch<React.SetStateAction<boolean>>;
  setPaymentComplete: React.Dispatch<React.SetStateAction<boolean>>;
  customerInfo: CustomerInfo;
  setOrderInfo: React.Dispatch<React.SetStateAction<OrderInfo | null>>;
  orderInfo: OrderInfo;
  setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfo | null>>;
  paymentInfo: PaymentInfo;
}

const Payment: React.FC<PaymentProps> = ({
  selectedServices,
  setCheckoutComplete,
  setPaymentComplete,
  customerInfo,
  orderInfo,
  setPaymentInfo,
  paymentInfo,
  setOrderInfo,
}) => {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<string>(
    orderInfo.paymentMethod || ""
  );
  const [paymentFee, setPaymentFee] = useState<number>(
    orderInfo.paymentFee || 0
  );

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPaymentMethod = e.target.value;
    setSelectedPaymentOption(newPaymentMethod);

    // Update orderInfo with the new payment method and fee
    const updatedOrderInfo = {
      ...orderInfo,
      paymentMethod: newPaymentMethod,
      paymentFee: calculatePaymentFee(newPaymentMethod), // Update payment fee
    };
    setOrderInfo(updatedOrderInfo);

    // Update paymentFee state with the new value
    setPaymentFee(updatedOrderInfo.paymentFee || 0);
  };

  const calculatePaymentFee = (selectedMethod: string): number => {
    const selectedOption = paymentOptions.find(
      (option) => option.name === selectedMethod
    );
    return selectedOption ? selectedOption.price : 0;
  };

  const handleBack = () => {
    setCheckoutComplete(false);
  };

  const handlePayment = () => {
    // Check if paymentInfo is null or undefined
    if (!paymentInfo) {
      alert("Please provide payment information.");
      return;
    }

    // Check payment information based on the selected payment method
    if (selectedPaymentOption === "Payment upon arrival at shop") {
      const tollPaymentInfo = paymentInfo as AtShopPaymentInfo;

      // Check required fields for Payment at Toll Station
      if (
        !tollPaymentInfo.dayOfWeek ||
        !tollPaymentInfo.timeSelection ||
        !tollPaymentInfo.isChecked
      ) {
        alert(
          "Please complete all required fields for Payment at Toll Station."
        );
        return;
      }
    } else if (selectedPaymentOption === "ImperiumCoins online payment") {
      const onlinePaymentInfo = paymentInfo as OnlinePaymentInfo;

      // Check required fields for Online Payment
      if (
        !onlinePaymentInfo.cardNumber ||
        !onlinePaymentInfo.expiryDate ||
        !onlinePaymentInfo.securityNumber
      ) {
        alert("Please complete all required fields for Online Payment.");
        return;
      }
    }
    // Proceed to complete payment
    setPaymentComplete(true);
  };

  return (
    <main className="container mx-auto px-4 py-8 mt-5 border rounded-lg max-w-xl lg:max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Payment</h1>
      <div className="lg:flex">
        {/* Left Column on Large Screens */}
        <div className="lg:w-1/2 lg:pr-4">
          <OrderSummary
            selectedServices={selectedServices}
            services={items}
          />
          <CustomerDetailsSummary customerInfo={customerInfo} />
        </div>
        {/* Right Column on Large Screens */}
        <div className="lg:w-1/2 lg:pl-4">
          <PaymentFormWrapper
            selectedPaymentOption={selectedPaymentOption}
            handlePaymentMethodChange={handlePaymentMethodChange}
            setPaymentInfo={setPaymentInfo}
          />
          <TotalSummary
            orderInfo={orderInfo}
            selectedPaymentOption={selectedPaymentOption}
            paymentFee={paymentFee}
          />
        </div>
      </div>
      {/* Back and Proceed Buttons */}
      <div className="flex justify-between px-5 py-8">
        <button
          onClick={handleBack}
          className="btn-back bg-primary text-white px-6 py-3 rounded-lg mt-4"
          aria-label="Back to Checkout"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          className="btn-proceed bg-primary text-white px-6 py-3 rounded-lg mt-4"
          aria-label="Complete Payment"
        >
          Complete Payment
        </button>
      </div>
    </main>
  );
};

export default Payment;
