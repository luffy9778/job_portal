import React from "react";
import { Oval } from "react-loader-spinner";

const OvalLoadingSpinner = () => {
  return (
    <Oval
      visible={true}
      height="40"
      width="40"
      color="#e65e10"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default OvalLoadingSpinner;
