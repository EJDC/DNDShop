import React from "react";
import { useState, useEffect } from "react";
import { Service } from "../../servicesBackend";
import { calculateTotalAndConvertToDNDDenominations } from "../../servicesBackend";

interface OrderSummaryProps {
  selectedServices: { [key: string]: number };
  services: Service[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ selectedServices }) => {
  const [itemDetails, setItemDetails] = useState<any[]>([]);

  const fetchItemDetails = async (url: string) => {
    try {
      const response = await fetch(`https://www.dnd5eapi.co${url}`);
      const itemDetail = await response.json();
      return itemDetail;
    } catch (error) {
      console.error(`Error fetching item details for ${url}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchDataForSelectedServices = async () => {
      const detailsPromises = Object.keys(selectedServices).map((url) =>
        fetchItemDetails(url)
      );

      try {
        const details = await Promise.all(detailsPromises);
        setItemDetails(details);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchDataForSelectedServices();
  }, [selectedServices]);

  return (
    <section className="border bg-secondary border-gray-400 p-4 rounded-md mb-5">
      <h2 className="text-2xl mb-5 font-bold text-center">Your Order</h2>
      {/* Your Order Summary */}
      {Object.entries(selectedServices).map(([url, quantity]) => {
        const itemDetail = itemDetails.find((item) => item.url === url);
        const totalCost = itemDetail
          ? calculateTotalAndConvertToDNDDenominations(
              itemDetail,
              quantity,
              itemDetail.cost.quantity
            )
          : "N/A";

        return (
          <div
            key={url}
            className="border bg-gray-200 border-gray-400 p-4 rounded-md relative mb-4"
          >
            {/* ServiceTitle */}
            <h3 className="font-bold mb-2">
              {" "}
              {itemDetail ? itemDetail.name : "N/A"}
            </h3>
            {/* Price, Quantity, and Total */}
            <p className="text-sm mb-2 text-right">
              <span>
                {itemDetail
                  ? `${itemDetail.cost.quantity} ${itemDetail.cost.unit}`
                  : "n/a"}{" "}
                x {quantity} =
              </span>
              <span className="font-bold ml-auto"> {totalCost}</span>
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default OrderSummary;
