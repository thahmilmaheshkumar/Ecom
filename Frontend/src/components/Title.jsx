import React from "react";

const Title = ({ title }) => {
  document.title = "Ecomerce | " + title;
  return null;
};

export default Title;
