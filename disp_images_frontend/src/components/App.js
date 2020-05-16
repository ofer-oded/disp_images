import React, { useEffect, useState } from 'react';
import MainView from './mainView';
import useResourceToGetURL from '../resources/useResourceToGetURL';
import useToDownloadImagesInBackground from '../hooks/useToDownloadImagesInBackground';
import useControlImageChange from '../hooks/useControlImageChange';
import useStateMachineToInvokeNextStep from '../hooks/useStateMachineToInvokeNextState';

const App = () => {

    // below are the events that the state machine get in order to control the state
    // have to use useState hook because this is the only way to do 1 time init for them
    const [nextURLrequested,setNextURLrequested] = useState(false);
    const [gotNextURL,setGotNextURL] = useState(false);
    const [imagesWasDownloaded,setImageWasDownloaded] = useState(false);

   // trigger the state machine
    const nextState = useStateMachineToInvokeNextStep(nextURLrequested,gotNextURL,imagesWasDownloaded);
  
    // enable/disable the controller according to current state
    const _nextURLrequested = useControlImageChange(nextState.controlImageChangeIsEnabled);
    useEffect(()=>{setNextURLrequested(_nextURLrequested);},[_nextURLrequested]);
    
    // request to get next image URL according to the current state
    const nextURL = useResourceToGetURL(nextState.nextURLWasRequested);
    useEffect(()=>{setGotNextURL(nextURL ==='' ? false : true);},[nextURL]);
    
    // request to download the next image URL
    const backgroundImage = useToDownloadImagesInBackground(nextURL,nextState.requestedTodownloadimage);
    useEffect(()=>{setImageWasDownloaded(backgroundImage.downloaded);},[backgroundImage.url,backgroundImage.downloaded]);

    return(
    <div> 
        <MainView downloadedImage = {backgroundImage.url} ></MainView>
    </div>
    );
}

export default App;