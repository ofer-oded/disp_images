import React, { useEffect } from 'react';
import MainView from './mainView';
import DisplayControl from './displayControl';
import {useState} from 'react';
import useResourceToGetURL from '../resources/useResourceToGetURL'
import useToDownloadImagesInBackground from '../hooks/useToDownloadImagesInBackground'

const App = () => {
    //const [dataRequested,setDataRequestedl] = useState(false);
    const [enableDisplayControl,setEnableDisplayControl] = useState(true);
    const [requestNextURL,setRequestNextURL] = useState(true);
    const nextURL = useResourceToGetURL(requestNextURL);
    const downLoadedImageSrc = useToDownloadImagesInBackground(nextURL);

    
    const handleDisplayControlClick = () =>
    {
        console.log('request next URL');
        setRequestNextURL(true);
    }

    useEffect(() => {
        setEnableDisplayControl(downLoadedImageSrc !== undefined &&
            downLoadedImageSrc !== '' &&
            downLoadedImageSrc !== null
            )

    },[downLoadedImageSrc])

    /*
    useEffect( () => {

    },[enableDisplayControl]

    )*/

  
    /*
    const handleEventImageLoaded = () => {
        console.log('image loaded')
        setEnableDisplayControl(true)
    }*/


    return(
    <div> 
        <MainView downloadedImage_source = {downLoadedImageSrc} ></MainView>
        <div>
        <DisplayControl enableRequests={enableDisplayControl} onClick = {handleDisplayControlClick}> </DisplayControl>
        </div>
    </div>
    );
}

export default App;