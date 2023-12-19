import React from "react";
import { convertToDNDDenominations } from "../../servicesBackend";

interface TotalSummaryProps {
  orderInfo: {
    subtotal: number;
    deliveryMethod?: string;
    deliveryFee: number;
    paymentMethod?: string;
    paymentFee: number;
    grandTotal: number;
  };
  selectedPaymentOption: string;
  paymentFee: number;
}

const TotalSummary: React.FC<TotalSummaryProps> = ({
  orderInfo,
  selectedPaymentOption,
  paymentFee,
}) => {
  const calculateTotal = (): number => {
    return orderInfo.subtotal + orderInfo.deliveryFee + paymentFee;
  };

  const updatedTotal = calculateTotal();

  return (
    <section className="border-4 border-double border-gray-600 bg-gray-100 p-4 rounded-md">
      <table className="w-full">
        <tbody>
          <tr className="border-b">
            <td className="py-2 font-bold">Subtotal</td>
            <td className="py-2 text-right font-bold">
              {orderInfo
                ? convertToDNDDenominations(orderInfo.subtotal)
                : "N/A"}
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2">
              {orderInfo?.deliveryMethod || "Delivery Type"}
            </td>
            <td className="py-2 text-right">
              {orderInfo
                ? orderInfo.deliveryFee === 0
                  ? "FREE"
                  : convertToDNDDenominations(orderInfo.deliveryFee)
                : "N/A"}
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2">{selectedPaymentOption || "Payment Type"}</td>
            <td className="py-2 text-right">
              {paymentFee === 0
                ? "FREE"
                : convertToDNDDenominations(paymentFee)}
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-3 bg-green-100 font-bold">Grand Total</td>
            <td className="py-2 font-bold bg-green-100 text-right">
              {convertToDNDDenominations(updatedTotal)}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default TotalSummary;
