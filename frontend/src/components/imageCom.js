import React from 'react'

// using inline styling
// the value must be a javascript object

const ImageCom= () => {
    return(
        <div> 
        <img src="http://127.0.0.1:8000/download/IMG_0082.JPG" alt = "not found" style = {{width:"500px" ,height:"600 px"}}></img>
        </div>
    );
}

export default ImageCom;