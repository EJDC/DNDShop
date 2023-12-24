import React from "react";
import { CustomerInfo } from "../forms/CustomerInfoForm";

interface CustomerDetailsSummaryProps {
  customerInfo: CustomerInfo;
}

const CustomerDetailsSummary: React.FC<CustomerDetailsSummaryProps> = ({
  customerInfo,
}) => {
  return (
    <section className="border bg-secondary border-gray-400 p-4 rounded-md text-center mb-5">
      <h2 className="text-2xl mb-5 font-bold text-center">Your Details</h2>
      {customerInfo ? (
        <div className="border bg-gray-200 border-gray-400 p-4 rounded-md relative mb-4">
          <p>
            {customerInfo.characterFirstName || "No First Name"}
            {customerInfo.characterLastName || "No Last Name"}
          </p>
          <p>{customerInfo.playerName || "Address line 1 not provided"}</p>
          <p>{customerInfo.lodgings || ""}</p>
          <p>{customerInfo.city || "City not provided"}</p>
          <p>{customerInfo.district || "Postcode not provided"}</p>
          <p>{customerInfo.partyName || "Phone number not provided"}</p>
          <p>{customerInfo.emailAddress || "Email address not provided"}</p>
        </div>
      ) : (
        <p>No customer information available</p>
      )}
    </section>
  );
};

export default CustomerDetailsSummary;
