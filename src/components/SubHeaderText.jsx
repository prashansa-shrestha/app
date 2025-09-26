import React from "react";

function SubHeaderText({text_detail1,text_detail2,text_detail3}){
    return <h3>
        {text_detail1}<br/>
        {text_detail2}<br/>
        {text_detail3}<br/>
        </h3>;
}

export default SubHeaderText;