import React, { useEffect, useRef } from "react";
import '../css/components/TimelinePicker.css'

function TimelinePicker({options,selectedOption,onChange}){
    const containerRef=useRef(null);
    const itemHeight=40;
    const visibleCount=5;

    function handleScroll(){
        const scrollTop=containerRef.current.scrollTop;
        const index=Math.round(scrollTop/itemHeight);
        const newOption=options[index];
        if (newOption && newOption!==selectedOption){
            console.log(newOption)
            onChange(newOption);
        }
    }

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
        <div className="timeline-picker" ref={containerRef} onScroll={handleScroll}>
            {/* upper spacing */}
            <div style={{height:`${(visibleCount-1)/2*itemHeight}px`}}/>
            
            {options.map((opt)=>(
                <div key={opt}>{opt}</div>
            ))}

            {/* lower spacing */}
            <div style={{height:`${(visibleCount-1)/2*itemHeight}px`}}/>

            {/* highlight band overlay */}
            <div className="highlight-band"/>
        </div>
    );
}

export default TimelinePicker;