import React from "react";

const BgBlurSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="w-16 h-16 border-4 border-t-transparent border-orange-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default BgBlurSpinner;
