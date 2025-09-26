import React, { useEffect, useRef } from "react";

function TimelinePicker({options,selectedOption,onChange}){
    const containerRef=useRef(null);
    const itemHeight=40;
    const visibleCount=5;

    // updates which option has been selected 
    function handleScroll(){
        const scrollTop=containerRef.current.scrollTop;
        const index=Math.round(scrollTop/itemHeight);
        const newOption=options[index];
        if (newOption && newOption!==selectedOption){
            onChange(newOption);
        }
    }

    //updates the element when selected option or the option change 
    useEffect(()=>{
        const index=options.indexOf(selectedOption)
        if (index>=0 && containerRef.current){
            containerRef.current.scrollTo({
                top: index*itemHeight,
                behavior:"smooth",
            });
        }
    },[selectedOption,options]);

    return(
    <div ref={containerRef} onScroll={handleScroll}>
        
        {/* scrollable region starts */}

        {/* upper space management */}
        <div style={{height:`${(visibleCount-1)/2*itemHeight}px`}}/>

        {options.map((opt)=>(
            <div key={opt}>
                {opt}
            </div>
        ))}
        
        {/*lower space management */}
        <div style={{height:`${(visibleCount-1)/2*itemHeight}px`}}/>

        {/* css le eslai center ma rakhdinxa */}
        <div className="highlight-band"/>

    </div>
);

}

export default TimelinePicker;