import React from "react";
import "../css/components/SubHeaderText.css"; // new css file


function SubHeaderText({text_detail1,text_detail2,text_detail3}){
    return <h3 className="sub-header-text">
        {text_detail1}<br/>
        {text_detail2}<br/>
        {text_detail3}<br/>
        </h3>;
}

export default SubHeaderText;