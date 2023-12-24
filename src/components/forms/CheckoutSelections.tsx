import React from "react";
import { useEffect, useState } from "react";
import { calculateTotalAndConvertToDNDDenominations } from "../../servicesBackend";

interface CheckoutSelectionsProps {
  selectedServices: { [key: string]: number };
  setSelectedServices: (services: { [key: string]: number }) => void;
}

const CheckoutSelections: React.FC<CheckoutSelectionsProps> = ({
  selectedServices,
  setSelectedServices,
}) => {
  const [itemDetails, setItemDetails] = useState<any[]>([]);

  // Function to fetch item details based on URL
  const fetchItemDetails = (url: string) => {
    return fetch(`https://www.dnd5eapi.co${url}`)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  };

  useEffect(() => {
    // Fetch details for each item in selectedServices
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

  const handleRemoveService = (url: string) => {
    const updatedServices = { ...selectedServices };
    delete updatedServices[url];
    setSelectedServices(updatedServices);
  };

  //FUNCTION - Add/Remove 'Preferred' Services and Update Quantities
  //Update state by returning current state + new quantity for a service, or new service with it's quantity if serviceDescription not in state.
  const handleQuantityChange = (url: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveService(url);
    } else {
      const updatedServices = {
        ...selectedServices,
        [url]: quantity,
      };
      setSelectedServices(updatedServices);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 mt-5 border rounded-lg max-w-xl lg:max-w-7xl">
      {/* Map out selected services and fetch details */}
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
            className="border bg-gray-100 border-gray-400 p-4 rounded-md relative"
          >
            {/* Remove button */}
            <button
              onClick={() => handleRemoveService(url)}
              className="absolute top-1 right-1 mt-1 mr-1 p-2 text-red-600"
            >
              &#10060;
            </button>
            {/* ServiceTitle */}
            <h3 className="font-bold mb-2">
              {itemDetail ? itemDetail.name : "N/A"}
            </h3>
            {/* Cost per unit */}
            <p className="mb-4">
              {itemDetail ? itemDetail.cost.quantity : "n/a"}{" "}
              {itemDetail ? itemDetail.cost.unit : "n/a"}
            </p>
            {/* Quantity adjustment */}
            <div className="flex items-center mb-6 justify-center">
              {/* Decrement button */}
              <button
                onClick={() =>
                  handleQuantityChange(url, Math.max(0, quantity - 1))
                }
                className="w-8 h-8 bg-red-600 text-white rounded-full ml-2"
                aria-label={`Decrease quantity of ${url}`}
              >
                -
              </button>
              {/* Quantity input */}
              <input
                min="1"
                value={quantity}
                onChange={(e) => handleQuantityChange(url, +e.target.value)}
                className="border border-gray-400 px-2 py-1 w-16 text-center ml-3 mr-4"
                aria-label={`Quantity of ${url}`}
              />
              {/* Increment button */}
              <button
                onClick={() => handleQuantityChange(url, quantity + 1)}
                className="w-8 h-8 bg-blue-600 text-white rounded-full mr-2"
                aria-label={`Increase quantity of ${url}`}
              >
                +
              </button>
            </div>
            {/* Total cost */}
            <p className="text-right font-bold">{totalCost}</p>
          </div>
        );
      })}
    </main>
  );
};

export default CheckoutSelections;
