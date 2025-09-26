import HeaderText from "../components/HeaderText";
import LineChart from "../components/LineChart";

function ResultLoadingPage2({text_labels}){
    const display_text="Analyzing Major Events"
    return(
        <div>
            <HeaderText text_detail={display_text}/>
            <LineChart text_labels={text_labels}/>
        </div>
    )
}

export default ResultLoadingPage2;