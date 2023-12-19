import React from "react";
import { CustomerInfo } from "../forms/CustomerInfoForm";

interface OrderConfirmationHeaderProps {
  customerInfo: CustomerInfo;
  handleNewOrder: () => void;
}

const OrderConfirmationHeader: React.FC<OrderConfirmationHeaderProps> = ({
  customerInfo,
  handleNewOrder,
}) => {
  
  const generateOrderReference = () => {
    const numerals = ["I", "V", "X", "L", "C", "D", "M"];
    let orderRefNumber = "";
    for (let i = 0; i < 10; i++) {
      const randomSelection = Math.floor(Math.random() * numerals.length);
      orderRefNumber += numerals[randomSelection];
    }
    return orderRefNumber;
  };

  const orderReference = generateOrderReference();
  const email = customerInfo?.emailAddress || "";

  return (
    <section className="bg-green-200 text-center rounded-lg border-4 border-green-500 p-8 mb-8">
      <h2 className="text-4xl font-bold mb-4">Payment Confirmed!</h2>
      <p className="text-xl mb-4">Your order is confirmed.</p>
      <p className="text-lg mb-4">Order Reference: {orderReference}</p>
      {email && (
        <p className="text-lg mb-4">An email will be sent to {email}</p>
      )}
      <button
        className="btn-proceed bg-primary text-white px-6 py-3 rounded-lg mt-4"
        aria-label="Create New Order"
        onClick={handleNewOrder}
      >
        New Order
      </button>
    </section>
  );
};

export default OrderConfirmationHeader;
