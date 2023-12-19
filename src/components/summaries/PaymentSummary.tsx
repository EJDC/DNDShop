import React from "react";
import { PaymentInfo } from "../../containers/Payment";

interface PaymentSummaryProps {
  paymentMethod: string;
  paymentInfo: PaymentInfo;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  paymentMethod,
  paymentInfo,
}) => {
  return (
    <section className="border bg-secondary border-gray-400 p-4 rounded-md mb-5">
      <h2 className="text-2xl mb-5 font-bold text-center">Your Payment</h2>
      {/* Payment Method */}
      <div className="border bg-gray-200 border-gray-400 p-3 rounded-md mb-4 flex flex-col items-center">
        <p>{paymentMethod}</p>
      </div>
      {/* Payment Info  */}
      {paymentInfo && (
        <div className="border bg-gray-200 border-gray-400 p-4 rounded-md mb-4">
          {Object.entries(paymentInfo).map(([fieldName, fieldValue]) => (
            <div key={fieldName} className="flex justify-between">
              <p className="font-bold">{fieldName}</p>
              <p>{fieldValue}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PaymentSummary;
