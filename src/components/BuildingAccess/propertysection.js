// Import necessary libraries and styles
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./propertysection.css"; // Make sure to have this CSS file in your project
import { toast, ToastContainer } from "react-toastify";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css"; // Ensure you have react-toastify installed and CSS imported
import { useAddress, useContract } from "@thirdweb-dev/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CONTRACT_ADDRESS2 } from "../../const/addresses.ts";

const PropertySection = ({ overlapGroupClassName, data }) => {
  const contractAddress = CONTRACT_ADDRESS2;
  const userAddress = useAddress();
  const { contract } = useContract(contractAddress);
  const [storage, setStorage] = useState({
    mainOwner: "",
    usersWithAccess: [],
    accessExpiry: [],
  });

  useEffect(() => {
    if (data && contract) {
      const fetchDataFromContract = async () => {
        try {
          const result = await contract.call("propertyDetails", [data], {
            from: userAddress,
          });
          setStorage(result);
          console.error("Data extracted");
        } catch (error) {
          console.error("Error fetching property details:", error);
        }
      };
      fetchDataFromContract();
    }
  }, [data, contract, userAddress]);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  // Helper function to calculate time left in a human-readable format
  function calculateTimeLeft(expiryTimestamp) {
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in UNIX timestamp
    const timeLeftInSeconds = expiryTimestamp - currentTime;
    const timeLeftInHours = Math.floor(timeLeftInSeconds / 3600);
    return timeLeftInHours > 0 ? `${timeLeftInHours} Hrs` : "Expired";
  }

  return (
    <div className="frame">
      <div className={`overlap-group ${overlapGroupClassName}`}>
        <div className="div-wrapper">
          <div className="text-wrapper">Property Number: {data}</div>
        </div>
      </div>
      <div className="div-4">
        <div className="text-wrapper-5">Temporary Owner Name</div>
        <div className="text-wrapper-6">Ending Time</div>
      </div>
      {storage.usersWithAccess.map((address, index) => {
        // Assuming accessExpiry is an array of BigNumber, convert it to readable format
        const expiryTime = storage.accessExpiry[index].toNumber(); // Adjust if your data structure is different
        const timeLeft = new Date(expiryTime * 1000).toLocaleString();
        return (
          <div className="div" key={index}>
            <div className="text-wrapper-2">
              <FontAwesomeIcon
                className="edit copy_clip"
                icon={faCopy}
                onClick={() => copyToClipboard(address)}
              />
              {address === undefined
                ? "Loading..."
                : address.slice(0, 4) + "....." + address.slice(39, 42)}
            </div>
            <div className="text-wrapper-3">{timeLeft}</div>
          </div>
        );
      })}
      <ToastContainer />
    </div>
  );
};

PropertySection.propTypes = {
  overlapGroupClassName: PropTypes.string,
  data: PropTypes.number.isRequired,
};

export default PropertySection;
