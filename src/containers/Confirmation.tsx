import React from "react";
import { items } from "../servicesBackend";
import { CustomerInfo } from "../components/forms/CustomerInfoForm";
import { OrderInfo } from "./Checkout";
import { AtShopPaymentInfo } from "../components/forms/PaymentAtTollForm";
import { OnlinePaymentInfo } from "../components/forms/OnlinePaymentForm";
import OrderConfirmationHeader from "../components/summaries/OrderConfirmationSummary";
import CustomerDetailsSummary from "../components/summaries/CustomerDetailsSummary";
import OrderSummary from "../components/summaries/OrderSummary";
import PaymentSummary from "../components/summaries/PaymentSummary";
import TotalSummary from "../components/summaries/TotalsSummary";

export interface BasePaymentInfo {}

export type PaymentInfo = OnlinePaymentInfo | AtShopPaymentInfo | null;

interface OrderConfirmationProps {
  selectedServices: { [key: string]: number };
  customerInfo: CustomerInfo;
  orderInfo: OrderInfo;
  paymentInfo: PaymentInfo;
  handleNewOrder: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  selectedServices,
  customerInfo,
  orderInfo,
  paymentInfo,
  handleNewOrder,
}) => {
  const paymentMethod = orderInfo.paymentMethod || "Payment Type";
  const paymentFee = orderInfo.paymentFee || 0;

  return (
    <main className="container mx-auto px-4 py-8 mt-5 border rounded-lg max-w-xl lg:max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Order Confirmation
      </h1>
      {/* Main Grid */}
      <OrderConfirmationHeader
        customerInfo={customerInfo}
        handleNewOrder={handleNewOrder}
      />
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
          <PaymentSummary
            paymentMethod={paymentMethod}
            paymentInfo={paymentInfo}
          />
          <TotalSummary
            orderInfo={orderInfo}
            selectedPaymentOption={paymentMethod}
            paymentFee={paymentFee}
          />
        </div>
      </div>
    </main>
  );
};

export default OrderConfirmation;
