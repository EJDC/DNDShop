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
            {customerInfo.firstName || "No First Name"}
            {customerInfo.lastName || "No Last Name"}
          </p>
          <p>{customerInfo.address1 || "Address line 1 not provided"}</p>
          <p>{customerInfo.address2 || ""}</p>
          <p>{customerInfo.city || "City not provided"}</p>
          <p>{customerInfo.postcode || "Postcode not provided"}</p>
          <p>{customerInfo.phoneNumber || "Phone number not provided"}</p>
          <p>{customerInfo.emailAddress || "Email address not provided"}</p>
        </div>
      ) : (
        <p>No customer information available</p>
      )}
    </section>
  );
};

export default CustomerDetailsSummary;
