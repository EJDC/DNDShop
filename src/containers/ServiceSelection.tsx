import React, { useState } from "react";
import { items, convertToDNDDenominations } from "../servicesBackend";

// INTERFACE - setSelectedServices function from .App => takes in list of services made up of strings (keys) and numbers, no returns.
interface ServiceSelectionProps {
  setSelectedServices: (services: { [key: string]: number }) => void;
}

// COMPONENT - has ability to set our Selected Services at App Level.
const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  setSelectedServices,
}) => {

  //STATE - Services are 'Preferred' when the user changes the quantities on the selection screen.
  const [preferredServices, setPreferredServices] = useState<{[key: string]: number;}>({});

  //FUNCTION - Add/Remove 'Preferred' Services and Update Quantities
  //Update state by returning current state + new quantity for a service, or new service with it's quantity if serviceDescription not in state.
  const handleQuantityChange = (
    serviceDescription: string,
    quantity: number
  ) => {
    setPreferredServices((currentPreferredServices) => ({
      ...currentPreferredServices,
      [serviceDescription]: quantity,
    }));
  };

  //FUNCTION - Make 'Preferred' Services into 'Selected' Services when user goes to Checkout.
  const addToCartGoToCheckout = () => {
    console.log(
      "Adding all selections to cart and proceeding to Checkout!",
      preferredServices
    );
    setSelectedServices(preferredServices);
  };

  //FUNCTION - return true or false if the service appears in preferredServices.
  const isActive = (serviceDescription: string): boolean =>
    preferredServices[serviceDescription] > 0;

  //FUNCTION - Calculate cost in decimal, then convert it into roman money using our (fake) backend services.
  const calculateTotal = (
    serviceDescription: string,
    quantity: number,
    price: number
  ) => {
    const totalinDecimal = quantity * price;
    return convertToDNDDenominations(totalinDecimal);
  };

  return (
    <main className="container mx-auto px-4 py-8 mt-5 max-w-xl lg:max-w-7xl">
      <h1 className="text-3xl text-primary font-bold mb-8 text-center">
        Service Selection
      </h1>
      {/* Create a Grid */}
      <section className="md:ml-10 md:mr-10 bg-secondary  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-8 rounded-lg ">
        {/* Map out our services imported from servicesbackend and create aan article for each*/}
        {items.map((service) => (
          <article
            key={service.itemDescription}
            className={`border p-4 rounded-md text-center ${
              isActive(service.itemDescription)
                ? "bg-green-100 border-green-500"
                : "bg-gray-100 border-gray-400"
            }`}
            aria-label={`Service: ${service.itemDescription}`}
          >
            <h2 className="mb-2 font-bold">{service.itemDescription}</h2>
            <p className="mb-2">{convertToDNDDenominations(service.price)}</p>
            {/* Quantity Input */}
            <div className="flex justify-center items-center mb-2">
              <button
                //For the service, retrieve current value from state by name (or just zero) and decrement one.  Don't allow to go less than zero.
                onClick={() =>
                  handleQuantityChange(
                    service.itemDescription,
                    Math.max(
                      0,
                      (preferredServices[service.itemDescription] || 0) - 1
                    )
                  )
                }
                className="w-8 h-8 bg-red-600 text-white rounded-full ml-2"
                aria-label={`Decrease quantity of ${service.itemDescription}`}
              >
                -
              </button>

              <input
                //Handle Manual Quantity Input (minimum zero)
                min="0"
                value={preferredServices[service.itemDescription] || 0}
                onChange={(e) =>
                  handleQuantityChange(
                    service.itemDescription,
                    +e.target.value
                  )
                }
                className="w-16 p-2 mr-3 ml-3 border rounded-md text-center mx-2"
                aria-label={`Quantity of ${service.itemDescription}`}
              />
              <button
                onClick={() =>
                  handleQuantityChange(
                    service.itemDescription,
                    (preferredServices[service.itemDescription] || 0) + 1
                  )
                }
                className="w-8 h-8 bg-blue-600 text-white rounded-full mr-2"
                aria-label={`Increase quantity of ${service.itemDescription}`}
              >
                +
              </button>
            </div>
            {/* Calculate total using service.price for the serviceDescription in from state (or zero)  */}
            <p className="mb-2">
              {calculateTotal(
                service.itemDescription,
                preferredServices[service.itemDescription] || 0,
                service.price
              )}
            </p>
          </article>
        ))}
      </section>
      <button
        onClick={addToCartGoToCheckout}
        className="bg-primary text-white px-5 py-5 rounded-md mt-4 mx-auto block"
      >
        Add All Selections to Cart
      </button>
    </main>
  );
};

export default ServiceSelection;
