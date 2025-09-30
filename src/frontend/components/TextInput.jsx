import React from "react";
import '../css/components/TextInput.css'
function TextInput({value, placeholder, onChange}){
    return <input 
    type="text"
    value={value}
    placeholder={placeholder}
    onChange={e=>onChange(e.target.value)}
    className="text-input"
    />
}

export default TextInput;