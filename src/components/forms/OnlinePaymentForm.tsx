import React from "react";
import { useState } from "react";
import { BasePaymentInfo } from "../../containers/Payment";

export interface OnlinePaymentInfo extends BasePaymentInfo {
  cardNumber: string;
  expiryDate: string;
  securityNumber: string;
}

interface OnlinePaymentFormProps {
  onChange: (paymentInfo: OnlinePaymentInfo) => void;
}

const OnlinePaymentForm: React.FC<OnlinePaymentFormProps> = ({ onChange }) => {
  const initialPaymentInfo: OnlinePaymentInfo = {
    cardNumber: "",
    expiryDate: "",
    securityNumber: "",
  };

  const [paymentInfo, setPaymentInfo] =
    useState<OnlinePaymentInfo>(initialPaymentInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Deconstruct
    const { name, value } = e.target;

    //Update Local State
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    });

    // Pass the updated payment info back to the Payment component
    onChange({
      ...paymentInfo,
      [name]: value,
    });
  };

  return (
    <form className="border bg-gray-200 border-gray-400 p-4 rounded-md mb-4">
      <h2 className="text-lg font-bold mb-2">Online Payment</h2>
      <div className="mb-4">
        <label
          className="block text-gray-800 text-sm font-bold mb-2"
          htmlFor="cardNumber"
        >
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder="Enter card number"
          value={paymentInfo.cardNumber}
          onChange={handleChange}
          className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-800 text-sm font-bold mb-2"
          htmlFor="expiryDate"
        >
          Expiry Date
        </label>
        <input
          type="text"
          id="expiryDate"
          name="expiryDate"
          placeholder="MM/YYYY"
          value={paymentInfo.expiryDate}
          onChange={handleChange}
          className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-800 text-sm font-bold mb-2"
          htmlFor="securityNumber"
        >
          Security Number
        </label>
        <input
          type="text"
          id="securityNumber"
          name="securityNumber"
          placeholder="Enter security number"
          value={paymentInfo.securityNumber}
          onChange={handleChange}
          className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
};

export default OnlinePaymentForm;
