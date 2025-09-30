import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/components/NextButton.css"; // we'll define this css


function NextButton({ to }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
  };

  return (
    <button onClick={handleClick} className="next-button">
      next&gt;&gt;
    </button>
  );
}

export default NextButton;