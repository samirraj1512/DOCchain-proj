import React from "react";
import "./YourComponent.css";
import image from "../Assets/Image2.png";
import { ConnectWallet } from "@thirdweb-dev/react";

const YourComponent = () => {
  return (
    <div className="landingPg1">
      <header>
        <div className="header-left">
          <a className="logo">
            <span style={{ color: "white" }}>Doc</span>
            <span className="chain" style={{ color: "white" }}>
              Chain
            </span>
          </a>
        </div>
        <div className="header-right">
          <a style={{ fontSize: "1.2rem" }} href="/about">
            <b>About</b>
          </a>
          {}
        </div>
      </header>
      <hr className="line" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="main">
        <div>Secure Your</div>
        <div>Identity</div>
      </div>
      <img src={image} alt="logo" className="frImage" />
      <ConnectWallet className="button" />
    </div>
  );
};

export default YourComponent;
