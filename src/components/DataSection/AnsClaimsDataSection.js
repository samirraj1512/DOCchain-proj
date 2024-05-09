import React from "react";
import "./DataSection.css";
import { Web3Button, useAddress } from "@thirdweb-dev/react";
import "../main_body.css";
import { CONTRACT_ADDRESS1 } from "../../const/addresses.ts";
const AnsClaimsDataSection = ({ data }) => {
  return (
    <div className="parent_data_div">
      <div className="data">
        <p>
          <strong>Answer Claim Request</strong>
        </p>
      </div>
      <DataCard data={data} />
    </div>
  );
};

// Data Card Component
const DataCard = ({ data }) => {
  return (
    <div className="data-card">
      <div className="scroll-container">
        {data &&
          data[0].map((field, index) => (
            <DataField
              key={index}
              field={field}
              index={index}
              value={data[1][index]}
              RequestedBy={data[2][index]}
              pending={data[3][index]}
            />
          ))}
      </div>
    </div>
  );
};

// Data Field Component
const DataField = ({ field, value, RequestedBy, index, pending }) => {
  var contractAddress = CONTRACT_ADDRESS1;
  var userAddress = useAddress();
  return (
    <div className="data-field">
      <div className="on-line">
        <div className="left-line">
          <p>
            <strong>Field</strong>
          </p>
        </div>
        <div className="right-line">
          <p>{field}</p>
        </div>
      </div>
      <div className="on-line">
        <div className="left-line">
          <p>
            <strong>Value</strong>
          </p>
        </div>
        <div className="right-line">
          <p>{value}</p>
        </div>
      </div>
      <div className="on-line">
        <div className="left-line">
          <p>
            <strong>Requested By:</strong>
          </p>
        </div>
        <div className="right-line">
          <p>{RequestedBy}</p>
        </div>
      </div>
      <div className="on-line">
        <div className="left-line">
          <p>
            <strong>Status:</strong>
          </p>
        </div>
        <div className="right-line">
          {!pending && <p>Answered</p>}
          {pending && <p>Not Answered</p>}
        </div>
      </div>

      {pending && (
        <div className="on-line_buttons-line">
          <Web3Button
            contractAddress={contractAddress}
            action={(contract) =>
              contract.call(
                "answeringRequestedClaim",
                [index, 1], // Assuming index is the identifier for the claim, and 1 signifies acceptance
                { from: userAddress }
              )
            }
            onSuccess={(results) => {
              console.log(results);
            }}
            className="right_accept"
          >
            {" "}
            Accept{" "}
          </Web3Button>
          <Web3Button
            contractAddress={contractAddress}
            action={(contract) =>
              contract.call(
                "answeringRequestedClaim",
                [index, 2], // Assuming index is the identifier for the claim, and 2 signifies decline
                { from: userAddress }
              )
            }
            onSuccess={(results) => {
              console.log(results);
            }}
            className="right_decline"
          >
            {" "}
            Decline{" "}
          </Web3Button>
        </div>
      )}
    </div>
  );
};

export default AnsClaimsDataSection;
