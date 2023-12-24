import React, { useState } from "react";

export interface CustomerInfo {
  characterFirstName: string;
  characterLastName: string;
  playerName: string;
  lodgings: string;
  city: string;
  district: string;
  partyName: string;
  emailAddress: string;
}

interface CustomerInfoFormProps {
  onChange: (customerInfo: CustomerInfo) => void;
}

const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({ onChange }) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    characterFirstName: "",
    characterLastName: "",
    playerName: "",
    lodgings: "",
    city: "",
    district: "",
    partyName: "",
    emailAddress: "",
  });

  //FUNCTION - Takes event which is fired when input's value changes.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //Destructure to extract name attribute of field (as defined in input tags) and current value
    const { name, value } = event.target;
    //Copy all existing properties into new object and add/update them with new values.
    const updatedCustomerInfo = {
      ...customerInfo,
      [name]: value,
    };
    //Set the new object into component's state.
    setCustomerInfo(updatedCustomerInfo);
    //Pass updated state back up to Checkout.
    onChange(updatedCustomerInfo);
  };

  return (
    <section className="border bg-secondary border-gray-400 p-4 rounded-md mb-8 mt-3">
      <form className="max-w-md mx-auto">
        <h2 className="text-2xl mb-5 font-bold text-center">Your Details</h2>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="characterFirstName"
            >
              Character First Name *
            </label>
            <input
              type="text"
              id="characterFirstName" //Links label and input, should match htmlFor in label.
              name="characterFirstName" //Used by handleChange function.
              value={customerInfo.characterFirstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="characterLastName"
            >
               Character Last Name *
            </label>
            <input
              type="text"
              id="characterLastName" //Links label and input, should match htmlFor in label.
              name="characterLastName" //Used by handleChange function.
              value={customerInfo.characterLastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="playerName"
          >
            Player Name *
          </label>
          <input
            type="text"
            id="playerName" //Links label and input, should match htmlFor in label.
            name="playerName" //Used by handleChange function.
            value={customerInfo.playerName}
            onChange={handleChange}
            placeholder="Enter your player's name"
            required
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="lodgings"
          >
            Lodgings / Inn / Tavern
          </label>
          <input
            type="text"
            id="lodgings" //Links label and input, should match htmlFor in label.
            name="lodgings" //Used by handleChange function.
            value={customerInfo.lodgings}
            onChange={handleChange}
            placeholder="Enter your lodgings"
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City *
            </label>
            <input
              type="text"
              id="city" //Links label and input, should match htmlFor in label.
              name="city" //Used by handleChange function.
              value={customerInfo.city}
              onChange={handleChange}
              placeholder="Enter your city"
              required
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="district"
            >
              District *
            </label>
            <input
              type="text"
              id="district" //Links label and input, should match htmlFor in label.
              name="district" //Used by handleChange function.
              value={customerInfo.district}
              onChange={handleChange}
              placeholder="Enter your district"
              required
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="partyName"
          >
            Party Name *
          </label>
          <input
            type="text"
            id="partyName" //Links label and input, should match htmlFor in label.
            name="partyName" //Used by handleChange function.
            value={customerInfo.partyName}
            onChange={handleChange}
            placeholder="Enter your party's name"
            required
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="emailAddress"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="emailAddress" //Links label and input, should match htmlFor in label.
            name="emailAddress" //Used by handleChange function.
            value={customerInfo.emailAddress}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </form>
    </section>
  );
};

export default CustomerInfoForm;
