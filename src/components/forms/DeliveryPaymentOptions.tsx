import React, { useEffect } from "react";
import {
  deliveryOptions,
  paymentOptions,
  DeliveryOption,
  PaymentOption,
  convertToDNDDenominations,
} from "../../servicesBackend";

export interface DeliveryPaymentOptionsProps {
  selectedDeliveryOption: DeliveryOption | null;
  selectedPaymentOption: PaymentOption | null;
  handleDeliverySelection: (option: DeliveryOption) => void;
  handlePaymentSelection: (option: PaymentOption) => void;
}

const DeliveryPaymentOptions: React.FC<DeliveryPaymentOptionsProps> = ({
  selectedDeliveryOption,
  selectedPaymentOption,
  handleDeliverySelection,
  handlePaymentSelection,
}) => {
  //UseEffect to set our defaults.
  useEffect(() => {
    // Find default delivery option
    const defaultDeliveryOption = deliveryOptions.find(
      (option) => option.default
    );
    // If default option is found and there is no selectedDeliveryOption, select the default one.
    if (defaultDeliveryOption && !selectedDeliveryOption) {
      handleDeliverySelection(defaultDeliveryOption);
    }

    // Find default payment option
    const defaultPaymentOption = paymentOptions.find(
      (option) => option.default
    );
    // If default option is found and there is no selectedDeliveryOption, select the default one.
    if (defaultPaymentOption && !selectedPaymentOption) {
      handlePaymentSelection(defaultPaymentOption);
    }

    // Run the useEffect if any of these change.
  }, [
    handleDeliverySelection,
    handlePaymentSelection,
    selectedDeliveryOption,
    selectedPaymentOption,
  ]);

  return (
    <section className="border bg-secondary border-gray-400 p-4 rounded-md mb-8 text-left">
      <div className="delivery-payment-options">
        <fieldset className="mt-4">
          <legend className="text-lg font-bold mb-2">Delivery Options</legend>
          {deliveryOptions.map((option) => (
            <div
              //Create divs for each delivery option.
              key={option.name}
              //Make green if the option is the selected delivery option.
              className={`flex items-start mb-4 p-4 rounded-md cursor-pointer ${
                selectedDeliveryOption?.name === option.name
                  ? "bg-green-200"
                  : "bg-gray-100"
              }`}
              //Make the whole div clickable.
              onClick={() => handleDeliverySelection(option)}
            >
              <input
                type="radio"
                id={`deliveryOption_${option.name}`}
                name="deliveryOptions"
                value={option.name}
                checked={selectedDeliveryOption?.name === option.name}
                onChange={() => handleDeliverySelection(option)}
              />
              <label
                htmlFor={`deliveryOption_${option.name}`}
                className="sr-only"
              >
                {option.name}
              </label>
              <span className="ml-3">
                <span className="font-bold">
                  {/* Render the option name and the price in roman denominations, unless it's free  */}
                  {`${option.name} - ${
                    option.price === 0
                      ? "FREE"
                      : convertToDNDDenominations(option.price)
                  }`}
                </span>
                <p className="mt-1 text-xs text-gray-600">
                  {option.description}
                </p>
              </span>
            </div>
          ))}
        </fieldset>
        <fieldset className="mt-4">
          <legend className="text-lg font-bold mb-2">Payment Options</legend>
          {paymentOptions.map((option) => (
            <div
              key={option.name}
              className={`flex items-start mb-4 p-4 rounded-md cursor-pointer ${
                selectedPaymentOption?.name === option.name
                  ? "bg-green-200"
                  : "bg-gray-100"
              }`}
              onClick={() => handlePaymentSelection(option)}
            >
              <input
                type="radio"
                id={`paymentOption_${option.name}`}
                name="paymentOptions"
                value={option.name}
                checked={selectedPaymentOption?.name === option.name}
                onChange={() => handlePaymentSelection(option)}
              />
              <label
                htmlFor={`paymentOption_${option.name}`}
                className="sr-only"
              >
                {option.name}
              </label>
              <span className="ml-3">
                <span className="font-bold">
                  {option.name} -{" "}
                  {option.price === 0
                    ? "FREE"
                    : convertToDNDDenominations(option.price)}
                </span>
                <p className="mt-1 text-xs text-gray-600">
                  {option.description}
                </p>
              </span>
            </div>
          ))}
        </fieldset>
      </div>
    </section>
  );
};

export default DeliveryPaymentOptions;
