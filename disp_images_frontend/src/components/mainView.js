import React, { useEffect } from 'react'
import './mainView.scss'

/*
responsible for displaying the images
*/


const MainView= (props) => {
    const notFoundURL = 'clear.gif';
    var image = document.images[0];
    
    const handleImageClickEvent = () => {
        if(image.requestFullscreen){
            image.requestFullscreen();
        } else if(image.mozRequestFullScreen){ // Firefox
            image.mozRequestFullScreen();
        } else if(image.webkitRequestFullscreen){ // Chrome, Safari and Opera 
            image.webkitRequestFullscreen();
        } else if(image.msRequestFullscreen) { // IE/Edge
            image.msRequestFullscreen();
       }
    }

    useEffect(()=>{
        if(props.downloadedImage !== null  && props.downloadedImage !== undefined && props.downloadedImage !== '') {
            image.src = props.downloadedImage;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.downloadedImage])

    return(
        <div> 
        <img src={notFoundURL} alt = "not found" onClick={handleImageClickEvent} ></img>
        </div>
    );
}

export default MainView;