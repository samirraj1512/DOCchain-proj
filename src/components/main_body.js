import React, { useEffect, useCallback } from "react";
import { useStorageUpload } from "@thirdweb-dev/react";
import { useDropzone } from "react-dropzone";
import "./main_body.css";
import avatar from "./Assets/avatar.jpg";
import ImageMakerModal from "./ImageGenerator/ImageMaker.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import "./Web3ButtonStyles.css";
import MakeClaimModal from "./MakeClaim/MakeClaimModal.js";
import RequestClaimModal from "./RequestClaim/RequestClaimModal.js";
import RequestInfoModal from "./RequestInfoModal.js";
import "./DataSection/DataSection.css";
import ClaimDataSection from "./DataSection/ClaimDataSection.js";
import InfoDataSection from "./DataSection/InfoDataSection.js";
import AnsClaimsDataSection from "./DataSection/AnsClaimsDataSection.js";
import AnsInfoDataSection from "./DataSection/AnsInfoDataSection.js";
import { useState } from "react";
import { MediaRenderer } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS1 } from "../const/addresses.ts";

const Content = () => {
  const contractAddress = CONTRACT_ADDRESS1;
  const userAddress = useAddress();
  const { contract } = useContract(contractAddress);
  const [openClaimModal, setOpenClaimModal] = useState(false);
  const [openReqModal, setOpenReqModal] = useState(false);
  const [openReqInfoModal, setOpenReqInfoModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [claimdata, setclaimdata] = useState(false);
  const [claimrequestdata, setclaimrequestdata] = useState(false);
  const [infodata, setinfodata] = useState(false);
  const [requestinfodata, setrequestinfodata] = useState(false);
  const [image, setImage] = useState("");
  const [allHash, setAllHash] = useState([]);
  const { mutateAsync: upload, isLoading } = useStorageUpload();
  const onDrop = useCallback(
    async (acceptorFiles) => {
      const uris = await upload({ data: acceptorFiles });
      console.log(uris);

      try {
        const result = await contract.call("enterADocument", [uris[0]], {
          from: userAddress,
        });
        toast.success("Document Added", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error) {
        console.log(error);
        toast.success("Error in Adding Document", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    },
    [upload]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("User Address copied to clipboard", {
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
  const everyMillisecondAmount = parseInt(
    (10_000_000_000_000 / 2.1).toFixed(0)
  );

  useEffect(() => {
    if (contract) {
      if (image == "") {
        const url = localStorage.getItem("image-url");
        if (url) setImage(localStorage.getItem("image-url"));
      }
      const fetchDataFromContract = async () => {
        try {
          const result = await contract.call("getAllClaims", [], {
            from: userAddress,
          });
          setclaimdata(result);
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      };
      fetchDataFromContract();
      const intervalId = setInterval(fetchDataFromContract, 2000);

      return () => clearInterval(intervalId);
    }
  }, [contract, everyMillisecondAmount, userAddress]);

  useEffect(() => {
    if (contract) {
      const fetchDataFromContract = async () => {
        try {
          const result = await contract.call("renderAllDocument", [], {
            from: userAddress,
          });
          setAllHash(result);
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      };
      fetchDataFromContract();
      const intervalId = setInterval(fetchDataFromContract, 2000);

      return () => clearInterval(intervalId);
    }
  }, [contract, everyMillisecondAmount, userAddress]);

  useEffect(() => {
    if (contract) {
      const fetchDataFromContract = async () => {
        try {
          const result = await contract.call("getAllReqFromMeClaims", [], {
            from: userAddress,
          });
          setclaimrequestdata(result);
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      };

      fetchDataFromContract();

      const intervalId = setInterval(fetchDataFromContract, 2000);

      return () => clearInterval(intervalId);
    }
  }, [contract, everyMillisecondAmount, userAddress]);

  useEffect(() => {
    if (contract) {
      const fetchDataFromContract = async () => {
        try {
          const result = await contract.call("getAllinfo", [], {
            from: userAddress,
          });
          setinfodata(result);
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      };

      fetchDataFromContract();

      const intervalId = setInterval(fetchDataFromContract, 2000);

      return () => clearInterval(intervalId);
    }
  }, [contract, everyMillisecondAmount, userAddress]);

  useEffect(() => {
    if (contract) {
      const fetchDataFromContract = async () => {
        try {
          const result = await contract.call("getAllFieldRequestFromMe", [], {
            from: userAddress,
          });
          setrequestinfodata(result);
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      };

      fetchDataFromContract();

      const intervalId = setInterval(fetchDataFromContract, 2000);

      return () => clearInterval(intervalId);
    }
  }, [contract, everyMillisecondAmount, userAddress]);

  return (
    <div className="poora-container">
      {openClaimModal && <MakeClaimModal setOpenModal={setOpenClaimModal} />}
      {openReqModal && <RequestClaimModal setOpenModal={setOpenReqModal} />}
      {openReqInfoModal && (
        <RequestInfoModal setOpenModal={setOpenReqInfoModal} />
      )}
      {openImageModal && (
        <ImageMakerModal setImage={setImage} setOpenModal={setOpenImageModal} />
      )}
      <div className="master_container">
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
        <div className="container">
          <div className="action_buttons">
            <div className="parent_button">
              <div className="web3Button">
                <Web3Button
                  contractAddress={contractAddress}
                  action={(contract) =>
                    contract.call("addUser", [userAddress], {
                      from: userAddress,
                    })
                  }
                  onSuccess={(results) => {
                    toast.success("User Added to DocChain", {
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
                  onError={(error) => {
                    toast.error("User Already Exists", {
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
                    backgroundColor: "white",
                    color: "black",
                    fontSize: "25px",
                  }}
                >
                  {" "}
                  Add Yourself{" "}
                </Web3Button>
              </div>

              <div className="web3Button">
                <Web3Button
                  contractAddress={contractAddress}
                  action={() => {
                    setOpenReqInfoModal(true);
                  }}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    fontSize: "25px",
                  }}
                >
                  Request Field Info
                </Web3Button>
              </div>
            </div>
          </div>
          <div className="profile">
            <div className="avatar_box">
              <img src={image != "" ? image : avatar} alt="" />
              <div className="AddProfile">
                <div className="generateButton">
                  <Web3Button
                    contractAddress={contractAddress}
                    action={() => {
                      setOpenImageModal(true);
                    }}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      fontSize: "20px",
                    }}
                  >
                    Generate Profile
                  </Web3Button>
                </div>
              </div>
            </div>
            <div className="username">
              {userAddress === undefined
                ? "Loading..."
                : userAddress.slice(0, 6) + "....." + userAddress.slice(38, 42)}
              <FontAwesomeIcon
                className="edit"
                icon={faCopy}
                onClick={() => copyToClipboard(userAddress)}
              />
            </div>
          </div>
          <div className="action_buttons">
            <div className="parent_button">
              <div className="web3Button">
                <Web3Button
                  contractAddress={contractAddress}
                  action={() => {
                    setOpenClaimModal(true);
                  }}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    fontSize: "25px",
                  }}
                >
                  Make a Claim
                </Web3Button>
              </div>

              <div className="web3Button">
                <Web3Button
                  contractAddress={contractAddress}
                  action={() => {
                    setOpenReqModal(true);
                  }}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    fontSize: "25px",
                  }}
                >
                  Request a Claim
                </Web3Button>
              </div>
            </div>
          </div>
        </div>
        <div className="data-section">
          <ClaimDataSection data={claimdata} />
          <InfoDataSection data={infodata} />
        </div>
        <br />
        <br />
        <div className="data-section">
          <AnsClaimsDataSection data={claimrequestdata} />
          <AnsInfoDataSection data={requestinfodata} />
        </div>
      </div>
    </div>
  );
};

export default Content;
