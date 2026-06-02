import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-screen bg-white z-50 flex items-center justify-center">
      <div className="h-20 w-20 border-8 border-blue-600 border-t-transparent rounded-full animate-spin transition-transform duration-1000"></div>
    </div>
  );
};

export default Loader;
