import React from "react";
import "../css/components/HeaderText.css"; // new css file

function HeaderText({ text_detail }) {
  return <h1 className="header-text">{text_detail}</h1>;
}

export default HeaderText;
