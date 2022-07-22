import React from "react";
import errorPage from "../lottie/error_balloon.json";
import Lottie from "lottie-react";
import "../css/errorpage.css";

export const Error = () => {

  return (
    <div>
      <Lottie className="animation" animationData={errorPage} loop={true} />
    </div>
    )
};
