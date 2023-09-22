import React from "react";

import "../../assets/css/inline-loader.css";
const Index = ({ extraStyle }) => {
  extraStyle = extraStyle || {};
  return (
    <div id="loader" className="inlineloader">
      <div
        className="uil-ring-css inline-loader"
        style={{ transform: "scale(1)" }}
      >
        {" "}
        <span
          className="loader"
          title="loading"
          style={{ float: "right" }}
        ></span>
        <div></div>
      </div>
    </div>
  );
};

export default Index;
