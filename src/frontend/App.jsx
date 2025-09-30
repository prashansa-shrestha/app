import {BrowserRouter, Routes, Route } from 'react-router-dom'
import FileUploadPage from './pages/FileUploadPage'
import JournalYourToday from './pages/JournalYourTodayPage'
import FocusOnPage from './pages/FocusOnPage'
import SeeYourFuturePage from './pages/SeeYourFuturePage'
import ResultLoadingPage1 from './pages/ResultLoadingPage1'
import ResultLoadingPage2 from './pages/ResultLoadingPage2'
import '../index.css' 
// import './App.css'

function App() {
  
  return (
    <main className="main-content">
      <Routes>
        <Route path='/' element={<FileUploadPage/>}/>
        <Route path='/journal-your-today' element={<JournalYourToday/>}/>
        <Route path='/focus-on' element={<FocusOnPage/>}/>
        <Route path='/see-your-future' element={<SeeYourFuturePage/>}/>
        <Route path='/result-loading-page1' element={<ResultLoadingPage1/>}/>
        <Route path='/result-loading-page2' element={<ResultLoadingPage2 data_labels={["Event A","Event B","Event C"]}/>}/>
      </Routes>
    </main>
  )
}

export default App
