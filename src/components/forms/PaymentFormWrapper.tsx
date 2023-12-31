import PaymentAtTollForm from "./PaymentAtShopForm";
import OnlinePaymentForm from "./OnlinePaymentForm";
import { PaymentInfo } from "../../containers/Payment";

interface PaymentFormWrapperProps {
  selectedPaymentOption: string;
  handlePaymentMethodChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfo | null>>;
}

const PaymentFormWrapper: React.FC<PaymentFormWrapperProps> = ({
  selectedPaymentOption,
  handlePaymentMethodChange,
  setPaymentInfo,
}) => {

  //Render Payment Form based on selected payment option
  const renderPaymentForm = () => {
    switch (selectedPaymentOption) {
      case "Payment in coin on arrival at shop":
        return <PaymentAtTollForm onChange={handlePaymentInfoChange} />;
      case "House Kunderak Online Payment":
        return <OnlinePaymentForm onChange={handlePaymentInfoChange} />;
      default:
        return <p>Select a payment method</p>;
    }
  };

  const handlePaymentInfoChange = (paymentInfo: PaymentInfo) => {
    setPaymentInfo(paymentInfo);
  };

  return (
    <section className="border bg-secondary border-gray-400 p-4 rounded-md mb-5">
      <h2 className="text-2xl mb-5 font-bold text-center">Your Payment</h2>
      <div className="border bg-gray-200 border-gray-400 p-3 rounded-md mb-4 flex flex-col items-center">
        <label
          htmlFor="paymentMethod"
          className="text-gray-800 text-sm font-bold mb-2"
        >
          Choose Payment Method
        </label>
        <select
          id="paymentMethod"
          value={selectedPaymentOption}
          onChange={handlePaymentMethodChange}
          className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Payment in coin on arrival at shop">
            Pay on arrival at shop
          </option>
          <option value="House Kunderak Online Payment">
            House Kunderak Online Payment
          </option>
        </select>
      </div>
      {renderPaymentForm()}
    </section>
  );
};

export default PaymentFormWrapper;
