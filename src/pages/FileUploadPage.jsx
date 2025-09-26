import HeaderText from '../components/HeaderText';
import FileUpload from '../components/FileUpload';
import NextButton from '../components/NextButton';

function FileUploadPage(){
    const display_text='Start with your journal entries';
    const next_link='/journal-your-today'

    console.log("we are in file upload page")
    return (
        <div>
            <HeaderText text_detail={display_text}/>
            <FileUpload/>
            <NextButton to={next_link}/>
        </div>
    );
}

export default FileUploadPage;