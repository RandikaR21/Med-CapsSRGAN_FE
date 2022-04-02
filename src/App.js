import './App.css';
import React, { useState} from 'react';
import FileUploader from "./components/FileUploader/FileUploader";
import ImagePreviewer from "./components/ImagePreviewer/ImagePreviewer";

function App() {
  const [preview, setPreview] = useState(false)
  const [imageFile, setImageFile] = useState()
  const handleFileUpload = (file) => {
    setImageFile(file)
    setPreview(true)
  }
  return(
      <>
          { !preview ? <FileUploader fileUpload={handleFileUpload.bind(this)}/> : <ImagePreviewer file = {imageFile} />}
      </>
  )
}

export default App;
