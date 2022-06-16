import './App.css';
import React, { useState} from 'react';
import FileUploader from "./components/FileUploader/FileUploader";
import ImagePreviewer from "./components/ImagePreviewer/ImagePreviewer";

function App() {
  const [preview, setPreview] = useState(false)
  const [originalImageFile, setOriginalImageFile] = useState()
  const [enhancedImageFile, setEnhancedImageFile] = useState()
  const handleFileUpload = (enhancedFile, originalFile) => {
    setEnhancedImageFile(enhancedFile)
    setOriginalImageFile(originalFile)
    setPreview(true)
  }
  return(
      <>
      <FileUploader fileUpload={handleFileUpload.bind(this)}/>
      { !preview ?  <></>: <ImagePreviewer enchancedFile = {enhancedImageFile} originalFile = {originalImageFile}/>}
      </>
  )
}

export default App;
