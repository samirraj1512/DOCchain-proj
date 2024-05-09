import React, { useState } from "react";
import "./MakeClaim/MakeClaimModal.css";
import { Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CONTRACT_ADDRESS1 } from "../const/addresses.ts";

function MakeClaimModal({ setOpenModal }) {
  const contractAddress = CONTRACT_ADDRESS1;
  const userAddress = useAddress(); // Define useAddress() function to get user's address

  const { contract } = useContract(contractAddress);
  const [formData, setFormData] = useState({
    Field: "",
    UserAddress: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Request Field Information</h1>
        </div>
        <form className="form-field">
          <label>
            Field:
            <input
              type="text"
              name="Field" // Match name attribute with formData key
              value={formData.Field}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Request From:
            <input
              type="text" // Use "type" instead of "name"
              name="UserAddress" // Match name attribute with formData key
              value={formData.UserAddress}
              onChange={handleInputChange}
            />
          </label>
          <br />
        </form>
        <div className="footer">
          <Web3Button
            contractAddress={contractAddress}
            action={() => {
              if (contract) {
                contract.call(
                  "reqFieldInfo",
                  [formData.UserAddress, formData.Field],
                  { from: userAddress }
                );
                console.log("ho");
              } else {
                console.log("poo");
              }
            }}
            onSuccess={(results) => {
              toast.success("Request of Info added to Blockchain", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              // setOpenModal(false);
              formData.Field = "";
              formData.UserAddress = "";
            }}
            onError={(error) => {
              toast.error("Claim Failed", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }}
            style={{
              backgroundColor: "#BAE84D",
              color: "white",
              fontSize: "24px",
            }}
          >
            Request
          </Web3Button>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default MakeClaimModal;
