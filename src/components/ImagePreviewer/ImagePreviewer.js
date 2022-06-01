import React, { useEffect, useState } from "react";
import './ImagePreviewer.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ImageSlider from "react-image-comparison-slider";
import reactImageSize from 'react-image-size';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'


function ImagePreviewer(props) {
    let [imgHeight, setHeight] = useState()
    let [imgWidth, setWidth] = useState()

    useEffect(() => {
        reactImageSize(props.enchancedFile)
            .then(({ width, height }) => {
                setHeight(height)
                setWidth(width)
            })
            .catch((errorMessage) => {
                console.log(errorMessage)
            });
    })

    const downloadImage = () => {
        console.log("Clicked")
        const link = document.createElement("a");
        link.href = props.enchancedFile;
        link.setAttribute("download", "enhanced_image.png"); //or any other extension
        document.body.appendChild(link);
        link.click();
    }

    return (
        <>
            <div className={"imageContainer"} >
                <h1 > Preview Enchanced Image </h1>
                <div className={"imagePreview"} >
                    <TransformWrapper >
                        <TransformComponent >
                            <img src={props.enchancedFile} alt={"Image Alt"} width={"100%"} />
                        </TransformComponent> </TransformWrapper> </div>
                <br />
                <h1> Image Details </h1>
                <ul>
                    <li> Height: {imgHeight} px </li>
                    <li> Width: {imgWidth} px </li>
                </ul>
                <br />
                <h1> Compare Original and Enhanced </h1>
                <div style={
                    { width: "100%", height: 600, display: "flex", alignContent: "center" }} >
                    <ImageSlider image1={props.enchancedFile} image2={props.originalFile} sliderWidth={3} sliderColor="red" handleColor="red" handleBackgroundColor="white" />
                </div> <button className={"downloadBtn"} onClick={downloadImage} ><FontAwesomeIcon icon={faDownload} /> Download Image</button >
            </div>
        </>
    )
}

export default ImagePreviewer;