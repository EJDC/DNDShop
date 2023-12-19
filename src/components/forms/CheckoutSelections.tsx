import React from "react";
import {
  convertToDNDDenominations,
  items,
  calculateTotalAndConvertToDNDDenominations,
} from "../../servicesBackend";

interface CheckoutSelectionsProps {
  selectedServices: { [key: string]: number };
  setSelectedServices: (services: { [key: string]: number }) => void;
}

const CheckoutSelections: React.FC<CheckoutSelectionsProps> = ({
  selectedServices,
  setSelectedServices,
}) => {
  const handleRemoveService = (serviceDescription: string) => {
    const updatedServices = { ...selectedServices };
    delete updatedServices[serviceDescription];
    setSelectedServices(updatedServices);
  };

  //FUNCTION - Add/Remove 'Preferred' Services and Update Quantities
  //Update state by returning current state + new quantity for a service, or new service with it's quantity if serviceDescription not in state.

  const handleQuantityChange = (
    serviceDescription: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      handleRemoveService(serviceDescription);
    } else {
      const updatedServices = {
        ...selectedServices,
        [serviceDescription]: quantity,
      };
      setSelectedServices(updatedServices);
    }
  };

  return (
    <section className="border bg-secondary border-gray-400 p-4 rounded-md mb-5">
      <h2 className="text-2xl mb-5 font-bold text-center">Your Selections</h2>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(selectedServices).map(
          ([serviceDescription, quantity]) => {
            const service = items.find(
              (service) => service.itemDescription === serviceDescription
            );
            const totalCost = service
              ? calculateTotalAndConvertToDNDDenominations(
                  serviceDescription,
                  quantity,
                  service.price
                )
              : "N/A";

            return (
              <div
                key={serviceDescription}
                className="border bg-gray-100 border-gray-400 p-4 rounded-md relative"
              >
                {/* Remove button */}
                <button
                  onClick={() => handleRemoveService(serviceDescription)}
                  className="absolute top-1 right-1 mt-1 mr-1 p-2 text-red-600"
                >
                  &#10060;
                </button>
                {/* ServiceTitle */}
                <h3 className="font-bold mb-2">{serviceDescription}</h3>
                {/* Cost per unit */}
                <p className="mb-4">
                  {service ? convertToDNDDenominations(service.price) : "N/A"}
                </p>
                {/* Quantity adjustment */}
                <div className="flex items-center mb-6 justify-center">
                  {/* Decrement button */}
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        serviceDescription,
                        Math.max(
                          0,
                          (selectedServices[serviceDescription] || 0) - 1
                        )
                      )
                    }
                    className="w-8 h-8 bg-red-600 text-white rounded-full ml-2"
                    aria-label={`Decrease quantity of ${serviceDescription}`}
                  >
                    -
                  </button>
                  {/* Quantity input */}
                  <input
                    min="1"
                    value={selectedServices[serviceDescription] || 0}
                    onChange={(e) =>
                      handleQuantityChange(serviceDescription, +e.target.value)
                    }
                    className="border border-gray-400 px-2 py-1 w-16 text-center ml-3 mr-4"
                    aria-label={`Quantity of ${serviceDescription}`}
                  />
                  {/* Increment button */}
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        serviceDescription,
                        (selectedServices[serviceDescription] || 0) + 1
                      )
                    }
                    className="w-8 h-8 bg-blue-600 text-white rounded-full mr-2"
                    aria-label={`Increase quantity of ${serviceDescription}`}
                  >
                    +
                  </button>
                </div>
                {/* Total cost */}
                <p className="text-right font-bold">{totalCost}</p>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default CheckoutSelections;
