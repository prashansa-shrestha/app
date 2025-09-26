import React from "react";
import "../css/components/HeaderText.css"; // new css file

function HeaderText({ text_detail }) {
  return <h2 className="header-text">{text_detail}</h2>;
}

export default HeaderText;
