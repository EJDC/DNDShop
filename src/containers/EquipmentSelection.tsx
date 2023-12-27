import React, { useState, useEffect } from "react";
import { convertToDNDDenominations2 } from "../servicesBackend";

// INTERFACE - setSelectedServices function from .App => takes in list of services made up of strings (keys) and numbers, no returns.
interface EquipmentSelectionProps {
  setSelectedServices: (services: { [key: string]: number }) => void;
}

interface Equipment {
  index: string;
  name: string;
  url: string;
}

interface EquipmentCategory {
  index: string;
  name: string;
  equipment: Equipment[];
  url: string;
}

// COMPONENT - has ability to set our Selected Services at App Level.
const EquipmentSelection: React.FC<EquipmentSelectionProps> = ({
  setSelectedServices,
}) => {
  //STATE - Services are 'Preferred' when the user changes the quantities on the selection screen.
  const [preferredEquipment, setPreferredEquipment] = useState<{
    [key: string]: number;
  }>({});
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<EquipmentCategory | null>(null);
  const [equipment, setEquipment] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://www.dnd5eapi.co/api/equipment-categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.results);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setEquipment([]);
      const timer = setTimeout(() => {
        fetchItemsByCategory(selectedCategory);
      }, 100); // Adjust the delay time as needed
      return () => clearTimeout(timer); // Clear the timeout on unmount if necessary
    }
  }, [selectedCategory]);

  //FUNCTION - Add/Remove 'Preferred' Services and Update Quantities
  //Update state by returning current state + new quantity for a service, or new service with it's quantity if serviceDescription not in state.
  const handleQuantityChange = (itemName: string, quantity: number) => {
    setPreferredEquipment((currentPreferredServices) => ({
      ...currentPreferredServices,
      [itemName]: quantity,
    }));
  };

  //FUNCTION - Make 'Preferred' Services into 'Selected' Services when user goes to Checkout.
  const addToCartGoToCheckout = () => {
    console.log(
      "Adding all selections to cart and proceeding to Checkout!",
      preferredEquipment
    );
    setSelectedServices(preferredEquipment);
  };

  //FUNCTION - return true or false if the service appears in preferredServices.
  const isActive = (serviceDescription: string): boolean =>
    preferredEquipment[serviceDescription] > 0;

  //FUNCTION - Calculate cost in decimal, then convert it into roman money using our (fake) backend services.
  const calculateTotal = (
    // @ts-ignore
    itemIndex: string,
    quantity: number,
    price: number,
    unit: string
  ) => {
    const totalinDecimal = quantity * price;
    return convertToDNDDenominations2(totalinDecimal, unit);
  };

  const handleCategoryChange = (categoryIndex: string) => {
    fetch(`https://www.dnd5eapi.co/api/equipment-categories/${categoryIndex}`)
      .then((response) => response.json())
      .then((data: EquipmentCategory) => {
        setSelectedCategory(data); // Update the 'selectedCategory' state with the fetched category
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  };

  // Function to fetch items based on the selected category
  const fetchItemsByCategory = (selectedCategory: EquipmentCategory | null) => {
    if (!selectedCategory) return;
    const equipmentURLs = selectedCategory.equipment.map((item) => item.url);
    // Fetch individual items using the URLs
    Promise.all(
      equipmentURLs.map((url) => fetch(`https://www.dnd5eapi.co${url}`))
    )
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((equipmentData) => {
        setEquipment(equipmentData);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };

  return (
    <main className="container mx-auto px-4 py-8 mt-5 max-w-xl lg:max-w-7xl">
      <h1 className="text-3xl text-primary font-bold mb-8 text-center">
        Service Selection
      </h1>
      {/* Create a Grid */}
      <section className="md:ml-10 md:mr-10 bg-secondary grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-8 rounded-lg">
        <select onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.index} value={category.index}>
              {category.name}
            </option>
          ))}
        </select>
        {/* Map out our services imported from servicesbackend and create an article for each */}
        {equipment.map((item) =>
          item.cost ? (
            <article
              key={item.index}
              className={`border p-4 rounded-md text-center ${
                isActive(item.url)
                  ? "bg-green-100 border-green-500"
                  : "bg-gray-100 border-gray-400"
              }`}
              aria-label={`Service: ${item.name}`}
            >
              <h2 className="mb-2 font-bold">{item.name}</h2>
              <p className="mb-2">
                {item.cost
                  ? convertToDNDDenominations2(
                      item.cost.quantity,
                      item.cost.unit
                    )
                  : null}
              </p>
              {/* Quantity Input */}
              <div className="flex justify-center items-center mb-2">
                <button
                  onClick={() =>
                    handleQuantityChange(
                      item.url,
                      Math.max(0, (preferredEquipment[item.url] || 0) - 1)
                    )
                  }
                  className="w-8 h-8 bg-red-600 text-white rounded-full ml-2"
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  -
                </button>
                <input
                  min="0"
                  value={preferredEquipment[item.url] || 0}
                  onChange={(e) =>
                    handleQuantityChange(item.url, +e.target.value)
                  }
                  className="w-16 p-2 mr-3 ml-3 border rounded-md text-center mx-2"
                  aria-label={`Quantity of ${item.name}`}
                />
                <button
                  onClick={() =>
                    handleQuantityChange(
                      item.url,
                      (preferredEquipment[item.url] || 0) + 1
                    )
                  }
                  className="w-8 h-8 bg-blue-600 text-white rounded-full mr-2"
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>
              {/* Calculate total using item.cost.quantity for the item.name in the state (or zero) */}
              <p className="mb-2">
                {item.cost
                  ? calculateTotal(
                      item.index,
                      preferredEquipment[item.url] || 0,
                      item.cost.quantity,
                      item.cost.unit
                    )
                  : "MAGIC"}
              </p>
            </article>
          ) : null
        )}
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

export default EquipmentSelection;
