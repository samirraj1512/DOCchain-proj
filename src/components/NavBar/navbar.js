import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navbar.css";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

const Navbar = () => {
  const userAddress = useAddress();
  const [QR, setQR] = useState("");
  const [QRpres, setQRpres] = useState(false);
  const generateQR = async () => {
    try {
      const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${userAddress}`;
      setQR(apiUrl);
      setQRpres(!QRpres);
    } catch (error) {
      console.error("Error fetching API", error);
    }
  };
  return (
    <div>
      <div className="navbar">
        <div className="navbar_left">
          <a className="logo" href="/">
            <span>Doc</span>
            <span className="chain">Chain</span>
          </a>
          <Link className="nav_component" to="/about">
            About
          </Link>
          <Link className="nav_component" to="/access">
            Property Access
          </Link>
          <Link className="nav_component" to="/voting">
            Voting
          </Link>
          <Link className="nav_component" to="/docker">
            Docker
          </Link>
        </div>
        <div className="navbar_right">
          <div className="connectWallet">
            <ConnectWallet />
          </div>
          <button onClick={generateQR} className="QR_generator">
            QR
          </button>
        </div>
      </div>

      {QRpres ? (
        <img style={{ border: "none" }} src={QR} className="QR" alt="" />
      ) : null}
    </div>
  );
};

export default Navbar;
