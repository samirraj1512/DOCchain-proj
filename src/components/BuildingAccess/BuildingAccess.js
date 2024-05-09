import React, { useState, useEffect } from "react";
import "./BuildingAccess.css";
import PropertySection from "./propertysection.js";
import { ToastContainer, toast } from "react-toastify";
import { Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import TemporaryProperty from "./TemporaryProperty.js";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { CONTRACT_ADDRESS2 } from "../../const/addresses.ts";

const HomePage = () => {
  const contractAddress = CONTRACT_ADDRESS2;
  const userAddress = useAddress();
  const { contract } = useContract(contractAddress);
  const [tempData, settempData] = useState(false);
  const [permData, setPermData] = useState(false);
  const [propertyID, setPropertyID] = useState("");
  const [propertyID2, setPropertyID2] = useState("");
  const [userAddress2, setUserAddress2] = useState("");
  const [excesstime2, setExcesstime2] = useState("");
  const [Transaction, setTransaction] = useState([]);
  const [Transactiontime, setTransactiontime] = useState([]);
  const [enterprop, setEnterprop] = useState("");
  const [isEligible, setIsEligible] = useState(false);
  const [usAdd, setUsAdd] = useState("");
  const handleInputChange = (e) => {
    setPropertyID(e.target.value);
  };

  const handleInputChange1 = (e) => {
    setPropertyID2(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setUserAddress2(e.target.value);
  };

  const handleInputChange3 = (e) => {
    setExcesstime2(e.target.value);
  };

  const handleInputChange4 = (e) => {
    setEnterprop(e.target.value);
    console.log("handle button");
    const fetchDataContract = async () => {
      try {
        const result = await contract.call(
          "checkAccess",
          [usAdd, e.target.value],
          { from: userAddress }
        );
        console.log(result);
        setIsEligible(result);
      } catch (error) {
        console.log(error);
        setIsEligible(false);
      }
    };
    if (e.target.value !== "") fetchDataContract();
    else setIsEligible(false);
  };

  const handleInputChange5 = (e) => {
    setUsAdd(e.target.value);
    console.log("handle button");
    const fetchDataContract = async () => {
      try {
        const result = await contract.call(
          "checkAccess",
          [e.target.value, enterprop],
          { from: userAddress }
        );
        console.log(result);
        setIsEligible(result);
      } catch (error) {
        console.log(error);
        setIsEligible(false);
      }
    };
    if (e.target.value !== "") fetchDataContract();
    else setIsEligible(false);
  };

  useEffect(() => {
    if (contract) {
      const fetchDataFromContract = async () => {
        try {
          const result = await contract.call(
            "readUserProperties",
            [userAddress],
            { from: userAddress }
          );
          setPermData(result);
        } catch (error) {
          console.log(error);
        }
      };
      fetchDataFromContract();
    }
  }, [contract]);

  useEffect(() => {
    if (contract) {
      const fetchDataFromContract = async () => {
        try {
          const result = await contract.call(
            "readTempProperties",
            [userAddress],
            { from: userAddress }
          );
          settempData(result);
        } catch (error) {
          console.log(error);
        }
      };
      fetchDataFromContract();
    }
  }, [contract]);

  return (
    <div className="landingPg">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <header>
        <div className="header-left">
          <a className="logo" href="/">
            <span>Doc</span>
            <span className="chain">Chain</span>
          </a>
        </div>
        <div className="header-right">
          <Link className="nav_component" to="/about">
            About Us
          </Link>
        </div>
      </header>
      <hr className="line" />
      <br />
      <br />
      <div className="inputs">
        <div className="add-property-form hello">
          <h1 className="hello2">Add Your Property</h1>
          <input
            type="text"
            value={propertyID}
            onChange={handleInputChange}
            placeholder="Enter Property ID"
            className="property-id-input"
          />
          <div className="button-form">
            <Web3Button
              contractAddress={contractAddress}
              style={{
                backgroundColor: "#217974",
                color: "#ffffec",
                fontSize: "1.25vw",
              }}
              action={(contract) =>
                contract.call(
                  "addProperty",
                  [parseInt(propertyID), userAddress], // Assuming the method takes propertyID as a parameter
                  { from: userAddress } // You would replace "userAddress" with actual user address variable
                )
              }
              onSuccess={(results) => {
                setPropertyID("");
                console.log(results);
                // Optionally reset propertyID state here or handle success
              }}
            >
              Add Property
            </Web3Button>
          </div>
        </div>

        <div className="add-property-form hello">
          <h1 className="hello2">Grant Access To Your Property</h1>
          <input
            type="text"
            value={propertyID2}
            onChange={handleInputChange1}
            placeholder="Enter Property ID"
            className="property-id-input"
          />
          <input
            type="text"
            value={userAddress2}
            onChange={handleInputChange2}
            placeholder="Enter User Address"
            className="property-id-input"
          />
          <br />
          <input
            type="text"
            value={excesstime2}
            onChange={handleInputChange3}
            placeholder="Enter time"
            className="property-id-input"
          />

          <div className="button-form">
            <Web3Button
              contractAddress={contractAddress}
              style={{
                backgroundColor: "#217974",
                color: "white",
                fontSize: "1.25vw",
              }}
              action={(contract) =>
                contract.call(
                  "grantAccess",
                  [parseInt(propertyID2), userAddress2, excesstime2], // Assuming the method takes propertyID as a parameter
                  { from: userAddress } // You would replace "userAddress" with actual user address variable
                )
              }
              onSuccess={(results) => {
                console.log(results);
                setPropertyID2("");
                setUserAddress2("");
                setExcesstime2("");
                // Optionally reset propertyID state here or handle success
              }}
            >
              Grant Access
            </Web3Button>
          </div>
        </div>
      </div>
      <div className="property-sections">
        <div className="property-heading">
          <div className="Perm-Heading">Permanent Properties</div>
        </div>
        <div className="properties">
          {permData.length > 0 ? (
            permData.map((property, index) => (
              <PropertySection key={index} data={property.toNumber()} />
            ))
          ) : (
            <div></div>
          )}
        </div>
        <div className="line"></div>
        <div className="temp-properties">
          <div className="t-heading">
            <div className="Perm-Heading">Temporary Properties</div>
          </div>
          <div className="temp-cards">
            {tempData.length > 0 ? (
              tempData.map((property, index) => (
                <TemporaryProperty key={index} data={property.toNumber()} />
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="line"></div>
        <div className="down">
          <div className="hello add-property-form hey">
            <h1 className="hello2">Get Who Accessed Your Property</h1>
            <br />
            <div className="input_wrapper">
              <input
                type="text"
                value={propertyID}
                onChange={handleInputChange}
                placeholder="Enter Property ID"
                className="property-id-input"
              />
              <Web3Button
                className="get_info"
                contractAddress={contractAddress}
                style={{ fontSize: "20px" }}
                action={(contract) =>
                  contract.call(
                    "propertyDetails",
                    [parseInt(propertyID)], // Assuming the method takes propertyID as a parameter
                    { from: userAddress } // You would replace "userAddress" with actual user address variable
                  )
                }
                onSuccess={(results) => {
                  console.log(results.usersWhoAccessed);
                  console.log(results.timeUsersWhoAccesssed);
                  // Optionally reset propertyID state here or handle success
                  setTransaction(results.usersWhoAccessed);
                  setTransactiontime(results.timeUsersWhoAccesssed);
                  console.log(Transaction);
                  console.log(Transactiontime);
                  setPropertyID("");
                }}
              >
                Get Info
              </Web3Button>
            </div>
            <div className="property-sections">
              <div className="complete-header">
                <div className="left-info head1">User</div>
                <div className="right-info head2">Time</div>
              </div>
              {Transaction.length > 0 &&
                Transactiontime.map((transaction, index) => (
                  <div className="complete-header">
                    <div key={index} className="left-info">
                      {Transaction[index]}
                    </div>
                    <div key={index} className="right-info">
                      {new Date(Transactiontime[index] * 1000).toLocaleString()}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="hello add-property-form hey">
            <h1 className="hello2">Allow in Your Property</h1>
            <br />
            <div className="input_wrapper">
              <input
                type="text"
                value={enterprop}
                onChange={handleInputChange4}
                placeholder="Enter Property ID"
                className="property-id-input"
              />
              <input
                type="text"
                value={usAdd}
                onChange={handleInputChange5}
                placeholder="Enter User Address"
                className="property-id-input"
              />
              {isEligible && (
                <Web3Button
                  className="get_info"
                  contractAddress={contractAddress}
                  style={{ fontSize: "20px" }}
                  action={(contract) =>
                    contract.call(
                      "userEnter",
                      [usAdd, parseInt(enterprop)], // Assuming the method takes propertyID as a parameter
                      { from: userAddress } // You would replace "userAddress" with actual user address variable
                    )
                  }
                  onSuccess={(results) => {
                    toast.success("User Entered", {
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
                >
                  Enter
                </Web3Button>
              )}
            </div>
            {!isEligible && (
              <div
                style={{ color: "red", fontSize: "24px", textAlign: "center" }}
              >
                Not eligible to enter into any property!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
