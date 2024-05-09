import React, { useState } from "react";
import "./MakeClaimModal.css";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CONTRACT_ADDRESS1 } from "../../const/addresses.ts";

function MakeClaimModal({ setOpenModal }) {
  const contractAddress = CONTRACT_ADDRESS1;
  const userAddress = useAddress(); // Define useAddress() function to get user's address

  const { contract } = useContract(contractAddress);
  const [formData, setFormData] = useState({
    Field: "",
    Value: "",
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
          <h1>Make a Claim</h1>
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
            Value:
            <input
              type="text"
              name="Value" // Match name attribute with formData key
              value={formData.Value}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Issued to:
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
                  "makeClaim",
                  [formData.UserAddress, formData.Field, formData.Value],
                  { from: userAddress }
                );
                console.log("ho");
              } else {
                console.log("poo");
              }
            }}
            onSuccess={(results) => {
              toast.success("Claim added to Blockchain", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              formData.Field = "";
              formData.UserAddress = "";
              formData.Value = "";
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
            Make Claim
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
