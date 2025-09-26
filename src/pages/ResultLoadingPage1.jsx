import HeaderText from "../components/HeaderText";
import SubHeaderText from "../components/SubHeaderText";

function ResultLoadingPage1(){
    const loading_text_1="Currently looking into your future";
    
    const loading_text_2="Time travelling ain't simple."
    
    const loading_text_3a="It'll take some time."
    const loading_text_3b="Don't hurry."
    const loading_text_3c="Hurry makes a bad curry."
    

    //loading text 1
    return(
    <div> 
        <HeaderText text_detail={loading_text_1}/>

        {/* //loading text 2 */}
        <HeaderText text_detail={loading_text_2}/>

        <SubHeaderText 
            text_detail1={loading_text_3a}
            text_detail2={loading_text_3b}
            text_detail3={loading_text_3c}
        />
    </div>  
    );
}

export default ResultLoadingPage1;