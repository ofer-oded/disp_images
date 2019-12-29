import React from 'react'
import RequestData from '../resources/makeAjaxRequest';

/*
responsible for displaying the images
*/

// using inline styling
// the value must be a javascript object

const ImageCom= (imageCount) => {
    const nextImageUrl = RequestData(imageCount); // request next image
    const fullUrl = `http://127.0.0.1:8000/download/${nextImageUrl}`;
  //  console.log(`http://127.0.0.1:8000/download${nextImageUrl}`);

    return(
        <div> 
        <img src={fullUrl} alt = "not found" style = {{width:"500px" ,height:"600 px"}}></img>
        </div>
    );
}

export default ImageCom;