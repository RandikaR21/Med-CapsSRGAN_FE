import './App.css';
import React, {useRef, useState} from 'react';
import FileUploader from "./components/FileUploader";

function App() {
  const [preview, setPreview] = useState(false)
  const [imageFile, setImageFile] = useState()
  const handleFileUpload = (file) => {
    setImageFile(file)
    setPreview(true)
  }
  return(
      <>
          <FileUploader fileUpload = {handleFileUpload.bind(this)}/>
      </>
  )
}

export default App;
