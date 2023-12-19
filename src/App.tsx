import React from "react";
import { useState } from "react";
import Navbar from "./components/NavBar";
import Selection from "./containers/ServiceSelection";
import Checkout from "./containers/Checkout";
import Payment, { PaymentInfo } from "./containers/Payment";
import { CustomerInfo } from "./components/forms/CustomerInfoForm";
import OrderConfirmation from "./containers/Confirmation";

const App: React.FC = () => {
  //Initiate blank customerinfo to avoid problems with validation at checkout.
  const initialCustomerInfo = {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    phoneNumber: "",
    emailAddress: "",
  };

  // STATE - Set empty object state for selectedServices and false for checkout and payment steps.
  const [selectedServices, setSelectedServices] = useState<{
    [key: string]: number;
  }>({});
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [orderInfo, setOrderInfo] = useState<any>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(initialCustomerInfo);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);

  // FUNCTION - Clear all our state for a new order.
  const handleNewOrder = () => {
    setSelectedServices({});
    setCheckoutComplete(false);
    setPaymentComplete(false);
    setOrderInfo(null);
    setCustomerInfo(initialCustomerInfo);
    setPaymentInfo(null);
  };

  const handleReturnToCheckout = () => {
    if (selectedServices && Object.keys(selectedServices).length === 0) {
      alert('Cart is empty!');
      return;
    }
  
    if (paymentComplete === true) {
      handleNewOrder();
    } else {
      setCheckoutComplete(false);
      setPaymentComplete(false);
      setPaymentInfo(null);
    }
  };

  // Check if selectedServices is 0, if so render Selection, if not
  // ...Check if checkoutComplete is false, is so render Checkout, if not,
  // ...Check if paymentComplete is false, if so render Payment, if not,
  // ...render OrderConfirmation.
  const renderStep = () => {
    if (Object.keys(selectedServices).length === 0) {
      return <Selection setSelectedServices={setSelectedServices} />;
    } else if (!checkoutComplete) {
      return (
        <Checkout
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          setCheckoutComplete={setCheckoutComplete}
          setOrderInfo={setOrderInfo}
          setCustomerInfo={setCustomerInfo}
          customerInfo={customerInfo}
        />
      );
    } else if (!paymentComplete) {
      return (
        <Payment
          selectedServices={selectedServices}
          setCheckoutComplete={setCheckoutComplete}
          setPaymentComplete={setPaymentComplete}
          customerInfo={customerInfo}
          orderInfo={orderInfo}
          setOrderInfo={setOrderInfo}
          setPaymentInfo={setPaymentInfo}
          paymentInfo={paymentInfo}
        />
      );
    } else {
      return (
        <OrderConfirmation
          selectedServices={selectedServices}
          customerInfo={customerInfo}
          orderInfo={orderInfo}
          paymentInfo={paymentInfo}
          handleNewOrder={handleNewOrder}
        />
      );
    }
  };

  return (
    <div className="App">
      <Navbar handleReturnToCheckout={handleReturnToCheckout} />
      {renderStep()}
    </div>
  );
};

export default App;