import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./TemporaryProperty.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Web3Button } from "@thirdweb-dev/react";
import { ToastContainer, toast } from "react-toastify";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS2 } from "../../const/addresses.ts";

const TemporaryProperty = ({ overlapGroupClassName, data }) => {
  const contractAddress = CONTRACT_ADDRESS2;
  const userAddress = useAddress(); // Assuming you want to use the connected user's address
  const { contract } = useContract(contractAddress);
  const [storage, setStorage] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const calculateMinutesLeft = (futureTime) => {
    // Get current Unix timestamp in seconds and convert to minutes
    const currentTime = Math.floor(Date.now() / 1000 / 60);
    // Convert future Unix timestamp from seconds to minutes
    const futureTimeInMinutes = Math.floor(futureTime / 60);
    // Calculate difference
    const minutesLeft = futureTimeInMinutes - currentTime;

    return minutesLeft > 0 ? minutesLeft : 0;
  };
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clip-board", {
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
  useEffect(() => {
    if (data && contract) {
      const fetchDataContract = async () => {
        try {
          const result = await contract.call("tempOwnerData", [data], {
            from: userAddress,
          });
          console.log(result);
          setStorage(result.mainOwner);
          setExpiryTime(result.expiryTime.toNumber());
          // console.log(storage);
          // console.log(expiryTime);
          console.error("Data extracted");
        } catch (error) {
          console.error("Error fetching property details:", error);
        }
      };
      fetchDataContract();
    }
  }, [data, contract, userAddress]);

  return (
    <div className="temp-frame">
      <div className={`temp-overlap-group ${overlapGroupClassName}`}>
        <div className="temp-div-wrapper">
          <div className="temp-text-wrapper">Property ID : {data}</div>
        </div>
      </div>
      <div className="temp-div-5">
        <div className="temp-text-wrapper-2">
          <FontAwesomeIcon
            className="edit copy_clip"
            icon={faCopy}
            onClick={() => copyToClipboard(storage)}
          />
          {storage === undefined
            ? "Loading..."
            : storage.slice(0, 6) + "....." + storage.slice(38, 42)}
        </div>
        <div className="temp-text-wrapper-3">
          {calculateMinutesLeft(expiryTime) + " min  "}
        </div>
      </div>
    </div>
  );
};

TemporaryProperty.propTypes = {
  overlapGroupClassName: PropTypes.string,
  data: PropTypes.number.isRequired, // Ensure data prop types match expected input
};

export default TemporaryProperty;
