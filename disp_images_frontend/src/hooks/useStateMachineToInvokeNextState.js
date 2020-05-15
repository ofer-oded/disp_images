import { useEffect, useState } from "react"

/**
 * hook which implements a state machine to control the flow
 * @param {*} nextURLrequested : Got a request to bring the next image URL which should be downloaded
 * @param {*} gotNextURL : received next image URL which should be downloaded
 * @param {*} imagesWasDownloaded : Image was downloaded
 */
const useStateMachineToInvokeNextStep = (nextURLrequested,gotNextURL,imagesWasDownloaded) => {
const [nextStep,setNextStep] = useState({'controlImageChangeIsEnabled':false,'nextURLWasRequested':false, 'requestedTodownloadimage':false });

useEffect(() => {
    if(nextStep.controlImageChangeIsEnabled === false && nextStep.nextURLWasRequested === false && nextStep.requestedTodownloadimage === false){
        // initial state should occurs only on page refresh
        if(!nextURLrequested && !gotNextURL && !imagesWasDownloaded ){
            // initial state :enable control to request the next URL
            setNextStep({'controlImageChangeIsEnabled':true,'nextURLWasRequested':false, 'requestedTodownloadimage':false});
        }
        else{
            console.log('check why we get into this situation !');
        }
    }

    if(nextStep.controlImageChangeIsEnabled === true && nextStep.nextURLWasRequested === false && nextStep.requestedTodownloadimage === false){
        // wait for requestNextURL
        if(nextURLrequested) {
            setNextStep({'controlImageChangeIsEnabled':false,'nextURLWasRequested':true,'requestedTodownloadimage':false});
        }
    }

    if(nextStep.controlImageChangeIsEnabled === false && nextStep.nextURLWasRequested === true && nextStep.requestedTodownloadimage === false){
        // wait for get next URL
        if(gotNextURL){
            setNextStep({'controlImageChangeIsEnabled':false,'nextURLWasRequested':false,'requestedTodownloadimage':true});
        }
    }

    if(nextStep.controlImageChangeIsEnabled === false && nextStep.nextURLWasRequested === false && nextStep.requestedTodownloadimage === true){
        // wait for image to be downloaded
        if(imagesWasDownloaded){
            setNextStep({'controlImageChangeIsEnabled':true,'nextURLWasRequested':false, 'requestedTodownloadimage':false});   
        }
    }
    
 
},[nextURLrequested, gotNextURL, imagesWasDownloaded, nextStep.controlImageChangeIsEnabled, nextStep.nextURLWasRequested, nextStep.requestedTodownloadimage])



return nextStep;

}

export default useStateMachineToInvokeNextStep;
