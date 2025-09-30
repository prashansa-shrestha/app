import { useEffect, useState } from "react";
import HeaderText from "../components/HeaderText";
import SubHeaderText from "../components/SubHeaderText";
import '../css/pages/ResultLoadingPage1.css'
function ResultLoadingPage1(){
    const loading_text_1="currently looking into your future...";
    
    const loading_text_2="time travelling ain't simple!"
    
    const loading_text_3a="it'll take some time,"
    const loading_text_3b="don't hurry."
    const loading_text_3c="hurry makes a bad curry!"
    
    const [step,setStep]=useState(0);

    useEffect(()=>{
        const interval= setInterval(() => {
            setStep((prev)=>(prev+1)%3);
        }, 1300);

        return ()=>clearInterval(interval);
    },[])

    //loading text 1
    return(
    <div className="result-loading-page1"> 
        {step ===0 && <HeaderText text_detail={loading_text_1}/>}

        {/* //loading text 2 */}
        {step ===1 && <HeaderText text_detail={loading_text_2}/>}

        {step===2 && <SubHeaderText 
            text_detail1={loading_text_3a}
            text_detail2={loading_text_3b}
            text_detail3={loading_text_3c}
        />}
    </div>  
    );
}

export default ResultLoadingPage1;