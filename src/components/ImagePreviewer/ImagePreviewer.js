import React, {useEffect, useState} from "react";
import Zoom from 'react-img-zoom'
import './ImagePreviewer.css';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}

function ImagePreviewer(props){
    const { height, width } = useWindowDimensions();
    return(
        <>
            <div className={"imageContainer"}>
                {/*<img src={props.file} alt={"Image Alt"} height={height * 0.9}/>*/}
                <Zoom
                    img={props.file}
                    zoomScale={3}
                    width={width * 0.7}
                    height={height * 0.9}
                />
            </div>
        </>
    )
}

export default ImagePreviewer;