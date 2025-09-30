import HeaderText from '../components/HeaderText';
import TextInput from '../components/TextInput';
import NextButton from '../components/NextButton';
import { useState } from 'react';
import '../css/pages/JournalYourTodayPage.css'

function JournalYourTodayPage(){
    const display_text="journal your today";
    const placeholder="how are you feeling?";
    const next_link='/focus-on';

    const [text,setText]=useState("");
    
    return (
    <div className='page-container'>
        <HeaderText text_detail={display_text}/>
        <TextInput value={text} onChange={setText} placeholder={placeholder}/>
        <NextButton to={next_link}/>
    </div>)
}

export default JournalYourTodayPage;