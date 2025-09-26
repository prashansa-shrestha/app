import HeaderText from "../components/HeaderText";
import LineChart from "../components/LineChart";
import "../css/pages/ResultLoadingPage2.css"

function ResultLoadingPage2({data_labels}){
    const display_text="analyzing your major events"
     return (
        <div className="result-loading-page2">
        <div className="result-loading-page2-left">
            <HeaderText text_detail={display_text} />
        </div>
        <div className="result-loading-page2-right">
            <div className="line-chart-background">
            <LineChart data_labels={data_labels} />
            </div>
        </div>
        </div>
  );
}

export default ResultLoadingPage2;