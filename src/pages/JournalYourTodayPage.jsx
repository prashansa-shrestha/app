import HeaderText from '../components/HeaderText';
import TextInput from '../components/TextInput';
import NextButton from '../components/NextButton';
import { useState } from 'react';

function JournalYourTodayPage(){
    const display_text="Journal your today";
    const placeholder="How are you feeling?";
    const next_link='/focus-on';

    const [text,setText]=useState("");
    
    return (<div>
        <HeaderText text_detail={display_text}/>
        <TextInput value={text} onChange={setText} placeholder={placeholder}/>
        <NextButton to={next_link}/>
    </div>)
}

export default JournalYourTodayPage;