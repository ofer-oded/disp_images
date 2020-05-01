import React, { useEffect, useState } from 'react';
import MainView from './mainView';
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
      

    return(
    <div> 
        <MainView downloadedImage= {backgroundImage.url} ></MainView>
    </div>
    );
}

export default App;