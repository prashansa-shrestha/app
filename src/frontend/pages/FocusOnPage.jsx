import HeaderText from '../components/HeaderText';
import TextInput from '../components/TextInput';
import NextButton from '../components/NextButton';
import { useState } from 'react';
import '../css/pages/FocusOnPage.css'

function FocusOnPage(){
    const display_text="focus on";
    const placeholder="an area of your life";
    const next_link='/see-your-future'

    const [text,setText]=useState("");
    
    return (<div className='page-container'>
        <HeaderText text_detail={display_text}/>
        <TextInput value={text} onChange={setText} placeholder={placeholder}/>
        <NextButton to={next_link}/>
    </div>)
}

export default FocusOnPage;