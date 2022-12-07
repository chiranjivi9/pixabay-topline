import React from "react";
import { Link } from 'react-router-dom'
import OpenImage from "./OpenImage";

const ImageCard = ({ image, setSelectedImage }) => {

    const invokeOpenImage = (imgData) => {
        setSelectedImage(imgData)
    }

    return (
        <Link to={`/image/` + image.id} target="_blank">
            <div className="max-w-sm rounded overflow-hidden shadow-xl cursor-pointer"
                onClick={() => invokeOpenImage(image)}>
                <img src={image.webformatURL} alt="" className="w-full" />
            </div>
        </Link>
    )
}


export default ImageCard;