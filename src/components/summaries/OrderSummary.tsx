import React from "react";
import { Service } from "../../servicesBackend";
import {
  calculateTotalAndConvertToDNDDenominations,
  convertToDNDDenominations,
} from "../../servicesBackend";

interface OrderSummaryProps {
  selectedServices: { [key: string]: number };
  services: Service[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedServices,
  services,
}) => {
  return (
    <section className="border bg-secondary border-gray-400 p-4 rounded-md mb-5">
      <h2 className="text-2xl mb-5 font-bold text-center">Your Order</h2>
      {/* Your Order Summary */}
      {Object.entries(selectedServices).map(
        ([serviceDescription, quantity]) => {
          const service = services.find(
            (service) => service.itemDescription === serviceDescription
          );
          const totalCost = service
            ? calculateTotalAndConvertToDNDDenominations(
                serviceDescription,
                quantity,
                service.price
              )
            : "N/A";
          const individualCost = service
            ? convertToDNDDenominations(service.price)
            : "N/A";

          return (
            <div
              key={serviceDescription}
              className="border bg-gray-200 border-gray-400 p-4 rounded-md relative mb-4"
            >
              {/* ServiceTitle */}
              <h3 className="font-bold mb-2">{serviceDescription}</h3>
              {/* Price, Quantity, and Total */}
              <p className="text-sm mb-2 text-right">
                <span>{`${individualCost} x ${quantity}`} = </span>
                <span className="font-bold ml-auto">{totalCost}</span>
              </p>
            </div>
          );
        }
      )}
    </section>
  );
};

export default OrderSummary;
