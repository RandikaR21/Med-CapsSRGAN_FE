import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import './FileUploader.css'

function FileUploader(props) {
    const dropArea = useRef(null)
    const input = useRef(null)
    const dragText = useRef(null)
    let file;

    const buttonClick = () => {
        input.current.click()
    }

    const inputOnchange = () => {
        file = input.current.files[0];
        dropArea.current.classList.add("active");
        showFile();
    }

    const dropAreaDragOver = (event) => {
        event.preventDefault(); //preventing from default behaviour
        dropArea.current.classList.add("active");
        dragText.current.textContent = "Release to Upload File";
    }

    const dropAreaDragLeave = () => {
        dropArea.current.classList.remove("active");
        dragText.current.textContent = "Drag & Drop to Upload File";
    }

    const dropAreaDrop = (event) => {
        event.preventDefault();
        file = event.dataTransfer.files[0];
        showFile();
    }

    const showFile = () => {
        let fileType = file.type; //getting selected file type
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
        if (validExtensions.includes(fileType)) { //if user selected file is an image file
            const formData = new FormData()
            formData.append("file", file)
            fetch("http://127.0.0.1:5000/upload", {
                method: "POST",
                body: formData
            }).then((response) => (response.blob()).then((blob) => {
                console.log(blob)
                const imageObjectURL = URL.createObjectURL(blob);
                props.fileUpload(imageObjectURL)
            }))
        } else {
            alert("This is not an Image File!");
            dropArea.current.classList.remove("active");
            dragText.current.textContent = "Drag & Drop to Upload File";
        }
    }
    return (
        <>
            <div
                onDragOver={dropAreaDragOver}
                onDragLeave={dropAreaDragLeave}
                onDrop={dropAreaDrop}
                ref={dropArea} className={"drag-area"}>
                <div className={"icon"}><FontAwesomeIcon icon={faCloudUpload} /></div>
                <header ref={dragText}>Drag & Drop to Upload File</header>
                <span>OR</span>
                <button onClick={buttonClick}>Browse File</button>
                <input onChange={inputOnchange} ref={input} type="file" hidden />
            </div>
        </>
    )
}

export default FileUploader;