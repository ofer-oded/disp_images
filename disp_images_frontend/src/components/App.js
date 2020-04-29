import React, { useEffect, useState } from 'react';
import MainView from './mainView';
//import DisplayControl from './displayControl';
//import {useState} from 'react';
import useResourceToGetURL from '../resources/useResourceToGetURL';
import useToDownloadImagesInBackground from '../hooks/useToDownloadImagesInBackground';
import useControlImageChange from '../hooks/useControlImageChange';
import useStateMachineToInvokeNextStep from '../hooks/useStateMachineToInvokeNextState';

const App = () => {

    const [nextURLrequested,setNextURLrequested] = useState(false);
    const [gotNextURL,setGotNextURL] = useState(false);
    const [imagesWasDownloaded,setImageWasDownloaded] = useState(false);

    const nextStep = useStateMachineToInvokeNextStep(nextURLrequested,gotNextURL,imagesWasDownloaded);
  
    const _nextURLrequested = useControlImageChange(nextStep.enableControlImageChange);
    useEffect(()=>{setNextURLrequested(_nextURLrequested);},[_nextURLrequested]);
    
    const nextURL = useResourceToGetURL(nextStep.requestNextURL);
    useEffect(()=>{setGotNextURL(nextURL ==='' ? false : true);},[nextURL]);
    

    const backgroundImage = useToDownloadImagesInBackground(nextURL);
    useEffect(()=>{setImageWasDownloaded(backgroundImage.downloaded);},[backgroundImage.url,backgroundImage.downloaded]);
      
    //let downloadedBackgroundImage = {'downloaded':true,'url':''};

 
    /*
    const [downloadedBackgroundImage,setDownloadedBackgroundImage] = useState({'downloaded':true,'url':''})
    const [urlRequested,setRequestNextURL] = useState(false)
    const [nextURLtoDownload,setNextURLtoDownload] = useState('');
    
    
   const _urlRequested = useControlImageChange(downloadedBackgroundImage.downloaded);
    useEffect(() => {
        setRequestNextURL(_urlRequested);
    },[_urlRequested]
    );

    console.log(urlRequested);
    const _nextURLtoDownload= useResourceToGetURL(urlRequested);
    useEffect(()=> {
        setNextURLtoDownload(_nextURLtoDownload);
    },[_nextURLtoDownload]);
  
    const _downloadedBackgroundImage = useToDownloadImagesInBackground(nextURLtoDownload);
    useEffect(() => {
        setDownloadedBackgroundImage(_downloadedBackgroundImage)
    },[_downloadedBackgroundImage, _downloadedBackgroundImage.downloaded, _downloadedBackgroundImage.url])
*/
    
   // setRequestNextURL(useControlImageChange(downloadedBackgroundImage.downloaded));
//    setNextURLtoDownload(useResourceToGetURL(urlRequested));
//    setDownloadedBackgroundImage(useToDownloadImagesInBackground(nextURLtoDownload));

  //  const urlRequested = useResourceToGetURL(requestNextURL);
  //  const downloadedBackgroundImage = useToDownloadImagesInBackground(urlRequested);
    
  //  const [enableDisplayControl,setEnableDisplayControl] = useState(true);
    //const [requestedNextURL,setRequestNextURL] = useState(true);
    
  //  const nextURL = useResourceToGetURL(requestNextURL);
  //  const downLoadedImageSrc = useToDownloadImagesInBackground(nextURL);
    //const requestingNextURL = useDisplayControl(downLoadedImageSrc)

    
    /*
    const handleDisplayControlClick = () =>
    {
        console.log('request next URL');
        return (true);
    }*/

    /*useEffect(() => {
        setEnableDisplayControl(downLoadedImageSrc !== undefined &&
            downLoadedImageSrc !== '' &&
            downLoadedImageSrc !== null
            )

    },[downLoadedImageSrc])*/

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
        <MainView downloadedImage= {backgroundImage.url} ></MainView>
    </div>
    );
}

export default App;