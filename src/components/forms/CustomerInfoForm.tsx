import React, { useState } from "react";

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  phoneNumber: string;
  emailAddress: string;
}

interface CustomerInfoFormProps {
  onChange: (customerInfo: CustomerInfo) => void;
}

const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({ onChange }) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    phoneNumber: "",
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
              htmlFor="firstName"
            >
              First Name *
            </label>
            <input
              type="text"
              id="firstName" //Links label and input, should match htmlFor in label.
              name="firstName" //Used by handleChange function.
              value={customerInfo.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name *
            </label>
            <input
              type="text"
              id="lastName" //Links label and input, should match htmlFor in label.
              name="lastName" //Used by handleChange function.
              value={customerInfo.lastName}
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
            htmlFor="address1"
          >
            Address 1 *
          </label>
          <input
            type="text"
            id="address1" //Links label and input, should match htmlFor in label.
            name="address1" //Used by handleChange function.
            value={customerInfo.address1}
            onChange={handleChange}
            placeholder="Enter your address"
            required
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="address2"
          >
            Address 2
          </label>
          <input
            type="text"
            id="address2" //Links label and input, should match htmlFor in label.
            name="address2" //Used by handleChange function.
            value={customerInfo.address2}
            onChange={handleChange}
            placeholder="Enter your address (optional)"
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
              htmlFor="postcode"
            >
              Postcode *
            </label>
            <input
              type="text"
              id="postcode" //Links label and input, should match htmlFor in label.
              name="postcode" //Used by handleChange function.
              value={customerInfo.postcode}
              onChange={handleChange}
              placeholder="Enter your postcode"
              required
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number *
          </label>
          <input
            type="text"
            id="phoneNumber" //Links label and input, should match htmlFor in label.
            name="phoneNumber" //Used by handleChange function.
            value={customerInfo.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
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
