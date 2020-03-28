import React from 'react'
import RequestData from '../resources/makeAjaxRequest';
import base_url from '../configs/base_url'
import './imageCom.scss'

/*
responsible for displaying the images
*/

// using inline styling
// the value must be a javascript object

const ImageCom= (imageCount) => {
    const nextImageUrl = RequestData(imageCount); // request next image
    const fullUrl = `http://${base_url}:8000/media/${nextImageUrl}`;
       
    return(
        <div> 
        <img src={fullUrl} alt = "not found" ></img>
        </div>
    );
}

export default ImageCom;