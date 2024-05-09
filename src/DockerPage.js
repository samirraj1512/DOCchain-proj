import React, { useEffect, useCallback } from "react";
import { useStorageUpload } from "@thirdweb-dev/react";
import { useDropzone } from "react-dropzone";
import "./components/main_body.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import "./components/Web3ButtonStyles.css";
import "./components/DataSection/DataSection.css";
import { useState } from "react";
import { MediaRenderer } from "@thirdweb-dev/react";
import Navbar from "./components/NavBar/navbar.js";
import Footer from "./components/Footer/Footer.js";
import { CONTRACT_ADDRESS1 } from "./const/addresses.ts";
import Manas from "./components/Assets/doc-icon.svg";

const Content = () => {
  const contractAddress = CONTRACT_ADDRESS1;
  const userAddress = useAddress();
  const { contract } = useContract(contractAddress);
  const [allHash, setAllHash] = useState([]);
  const [status, setStatus] = useState(0);
  const [hash, setHash] = useState("");
  const { mutateAsync: upload, isLoading } = useStorageUpload();

  const onDrop = useCallback(
    async (acceptorFiles) => {
      const uris = await upload({ data: acceptorFiles });
      console.log(uris);
      setStatus(1);
      setHash(uris[0]);
    },
    [upload]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("IFPS link copied", {
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
      const intervalId = setInterval(fetchDataFromContract, 200000);

      return () => clearInterval(intervalId);
    }
  }, [contract, everyMillisecondAmount, userAddress]);

  function isImage(hash) {
    // Extract file extension from the hash
    const fileExtension = hash.split(".").pop().toLowerCase();
    // Check if the file extension corresponds to an image type
    return ["jpg", "jpeg", "png", "gif", "bmp"].includes(fileExtension);
  }

  return (
    <div className="poora-container">
      <Navbar />
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
        {status === 0 && (
          <div className="doccontain access_contract" {...getRootProps()}>
            <input {...getInputProps()} />
            <button className="docbutton">Click to Add Document</button>
          </div>
        )}
        {status === 1 && hash !== "" && (
          <div className="doccontain access_contract">
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) =>
                contract.call("enterADocument", [hash], { from: userAddress })
              }
              className="docbutton access_contract"
              onSuccess={(results) => {
                toast.success("Added Your Document to Block-Chain!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
                setStatus(0);
              }}
              onError={(error) => {
                console.log(error);
                toast.error("Upload Failed!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
                setStatus(0);
              }}
              style={{
                backgroundColor: "white",
                color: "black",
                fontSize: "1.4vw",
                width: "15vw",
              }}
            >
              {" "}
              Add it to BlockChain{" "}
            </Web3Button>

            <br />
            <br />

            <br />
            <p className="hash-val" onClick={() => copyToClipboard(hash)}>
              {hash}
            </p>
            <br />
            <br />

            <br />
            <br />
            <br />
          </div>
        )}

        <div className="image-grid">
          {allHash.map((hash, index) => (
            <div
              className="render-block"
              key={index}
              onClick={() => copyToClipboard(hash)}
            >
              {isImage(hash) ? (
                <MediaRenderer
                  className="rendered"
                  key={index}
                  src={hash}
                  alt={`Document ${hash}`}
                />
              ) : (
                <div>
                  <MediaRenderer
                    className="rendered1"
                    key={index}
                    src={hash}
                    alt={"Click To Access"}
                  />
                  <img
                    className="default-image"
                    key={index}
                    src={Manas} // Specify the source for your default image
                    alt={`Default Document ${hash}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Content;
