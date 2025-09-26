import HeaderText from "../components/HeaderText";
import TimelinePicker from "../components/TimelinePicker";
import NextButton from "../components/NextButton";

function SeeYourFuturePage(){
    const display_text="See your future";
    const timeline_options=["6 month","1 year","2 year"]
    return(
        <div>
            <HeaderText text_detail={display_text}/>
            <TimelinePicker options={timeline_options}/>
            <NextButton/>
        </div>
    );
}
export default SeeYourFuturePage;