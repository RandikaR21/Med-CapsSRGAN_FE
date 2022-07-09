import React, {useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudUpload, faImage, faXmark} from "@fortawesome/free-solid-svg-icons";
import './FileUploader.css'
import LoadingSpin from "react-loading-spin";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FileUploader(props) {
    const dropArea = useRef(null)
    const input = useRef(null)
    const dragText = useRef(null)
    let [fileName, setFileNameState] = useState();
    let file = null;
    let [fileState, setFileState] = useState(file)
    const [chooseFileBtnDisable, setFileBtnDisable] = useState(false)
    const [loadingAnimation, setLoadingAnimation] = useState(false)

    const refresh = () => {
        window.location.reload();
    }

    const buttonClick = () => {
        input.current.click()
    }

    const inputOnchange = () => {
        file = input.current.files[0];
        setFileBtnDisable(true)
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
            let fileReader = new FileReader(); //creating new FileReader object
            fileReader.onload = () => {
                let fileURL = fileReader.result; //passing user file source in fileURL variable
                dropArea.current.innerHTML = `<img src="${fileURL}" alt="image">`; //adding that created img tag inside dropArea container
                setFileNameState(file.name)
                setFileState(file)
            }
            fileReader.readAsDataURL(file);
        } else {
            alert("This is not an Image File!");
            dropArea.current.classList.remove("active");
            dragText.current.textContent = "Drag & Drop to Upload File";
        }
    }

    const enhanceImage = async () => {
        const formData = new FormData()
        formData.append("file", fileState)
        const response = await toast.promise(
            fetch("http://localhost:8000/uploadfile",
                {
                    method: "POST", body: formData
                })
                .then((response) => (response.blob()).then((blob) => {
                    const enhanceImageObjectURL = URL.createObjectURL(blob);
                    const originalImageObjectURL = URL.createObjectURL(fileState);
                    props.fileUpload(enhanceImageObjectURL, originalImageObjectURL)
                }))
            , {
                pending: 'Enhancing Image', success: 'Enhance SuccessFull 👌', error: {
                    render({data}) {
                        return 'Enhance Failed 🤯'
                    }
                }
            });
        console.log(response)
    }

    return (<>
        <div className={"fileUploaderContainer"}>
            <h1>Chest X-Ray Image Enhance</h1>
            <div className={"grid"}>
                <div className={"gridLeft"}>
                    <div
                        onDragOver={dropAreaDragOver}
                        onDragLeave={dropAreaDragLeave}
                        onDrop={dropAreaDrop}
                        ref={dropArea}
                        className={"drag-area"}>
                        <p className={"icon"}><FontAwesomeIcon icon={faCloudUpload}/></p>
                        <p className={"dragText"} ref={dragText}>Drag file to upload</p>
                        <button onClick={buttonClick}
                                className={"chooseBtn"}
                                disabled={chooseFileBtnDisable}>Choose file
                        </button>
                        <input onChange={inputOnchange} ref={input} type="file" hidden/>
                    </div>
                </div>
                <div className={"gridRight"}>
                    {fileState != null ? <div style={{padding: 0}}>
                        <div className={"detailCard"}>
                            <p className={"cardIcon"}><FontAwesomeIcon icon={faImage}/></p>
                            <p className={"imageFileName"}>{fileName}</p>
                            <button onClick={refresh}><FontAwesomeIcon icon={faXmark}/></button>
                        </div>
                        <div className={"loadingAnimation"}>
                        </div>
                        <button className={"enhanceBtn"}
                                onClick={enhanceImage}
                                disabled={loadingAnimation}>
                            Enhance Image
                        </button>
                    </div> : <></>}
                </div>
            </div>
        </div>
        <ToastContainer/>
    </>)
}

export default FileUploader;