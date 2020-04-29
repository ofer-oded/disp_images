import React, { useEffect } from 'react'
//import {useState} from 'react'

//import useResourceToGetURL from '../resources/makeAjaxRequest';
//import base_url from '../configs/base_url'
import './mainView.scss'

/*
responsible for displaying the images
*/


const MainView= (props) => {
    //const nextImageUrl = useResourceToGetURL(imageCount); // request next image
    //const nextImageUrl = props.imageToBeDisplayed
    //const fullUrl = `http://${base_url}:8000/media/${nextImageUrl}`;
    const notFoundURL = 'clear.gif';
    //const [imageLoaded,setImageLoaded] = useState(false)
    
    var image = document.images[0];
    
    useEffect(()=>{
        if(props.downloadedImage !== null  && props.downloadedImage !== undefined && props.downloadedImage !== '') {
            image.src = props.downloadedImage;
        }
     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.downloadedImage])
    //var downloadingImage = new Image();
    
    /*
    downloadingImage.onload = () => {
        image.src = downloadingImage.src;
        setImageLoaded(true)
    }*/
    
    //downloadingImage.src = fullUrl;

    /*
    if(imageLoaded){
       props.onImageLoad()
    }*/


    return(
        <div> 
        <img src={notFoundURL} alt = "not found" ></img>
        </div>
    );
}

export default MainView;