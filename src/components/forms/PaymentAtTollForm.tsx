import React from "react";
import { BasePaymentInfo } from "../../containers/Payment";
import { useState } from "react";

export interface AtTollPaymentInfo extends BasePaymentInfo {
  dayOfWeek: string;
  timeSelection: string;
  isChecked: boolean;
}

interface PaymentAtTollFormProps {
  onChange: (paymentInfo: AtTollPaymentInfo) => void;
}

const PaymentAtTollForm: React.FC<PaymentAtTollFormProps> = ({ onChange }) => {
  const initialPaymentInfo: AtTollPaymentInfo = {
    dayOfWeek: "",
    timeSelection: "",
    isChecked: false,
  };

  const [paymentInfo, setPaymentInfo] =
    useState<AtTollPaymentInfo>(initialPaymentInfo);

  const handleChange = (
    //Takes a Select or Input Change
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {

    //Deconstruct
    const { name, value, type } = e.target;

    //If it's a checkbix
    if (type === "checkbox") {
      //Check if it's checked.
      const isChecked = (e.target as HTMLInputElement).checked;
      //Set Local Stae
      setPaymentInfo((prevPaymentInfo) => ({
        ...prevPaymentInfo,
        [name]: isChecked,
      }));

      // Pass the updated payment info back to the Payment component
      onChange({
        ...paymentInfo,
        [name]: isChecked,
      });
      //If not a checkbox...
    } else {
      //Set Local State
      setPaymentInfo((prevPaymentInfo) => ({
        ...prevPaymentInfo,
        [name]: value,
      }));

      // Pass the updated payment info back to the Payment component
      onChange({
        ...paymentInfo,
        [name]: value,
      });
    }
  };

  return (
    <form className="border bg-gray-200 border-gray-400 p-4 rounded-md mb-4">
      <h2 className="text-lg font-bold mb-2">Payment at Toll</h2>
      <div className="mb-4">
        <label
          className="block text-gray-800 text-sm font-bold mb-2"
          htmlFor="dayOfWeek"
        >
          Select Day of Week
        </label>
        <select
          id="dayOfWeek"
          name="dayOfWeek"
          onChange={handleChange}
          className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled selected>
            Please select day of the week
          </option>
          <option value="Monday">dies Lunae</option>
          <option value="Tuesday">dies Martis</option>
          <option value="Wednesday">dies Mercurii</option>
          <option value="Thursday">dies Jovis</option>
          <option value="Firday">dies Veneris</option>

        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-800 text-sm font-bold mb-2"
          htmlFor="timeSelection"
        >
          Select Time
        </label>
        <select
          id="timeSelection"
          name="timeSelection"
          onChange={handleChange}
          className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled selected>
            Please select time
          </option>
          <option value="Early">Early</option>
          <option value="Morning">Morning</option>
          <option value="Morning">Afternoon</option>
          <option value="Morning">Evening</option>
          <option value="Morning">Late</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-800 text-sm font-bold mb-2"
          htmlFor="promiseCheckbox"
        >
          <input
            type="checkbox"
            id="promiseCheckbox"
            name="isChecked"
            checked={paymentInfo.isChecked}
            onChange={handleChange}
            className="mr-2"
          />
          I promise to pay on arrival and may have to queue.
        </label>
      </div>
    </form>
  );
};

export default PaymentAtTollForm;
