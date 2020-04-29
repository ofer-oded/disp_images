import { useEffect, useState } from "react"


const useStateMachineToInvokeNextStep = (nextURLrequested,gotNextURL,imagesWasDownloaded) => {
const [nextStep,setNextStep] = useState({'enableControlImageChange':false,'requestNextURL':false, 'requestTodownladimage':false });

useEffect(() => {
    if(nextStep.enableControlImageChange === false && nextStep.requestNextURL === false && nextStep.requestTodownladimage === false){
        // initial state should occurs only on page refresh
        if(!nextURLrequested && !gotNextURL && !imagesWasDownloaded ){
            // initial state :enable control to request the next URL
            setNextStep({'enableControlImageChange':true,'requestNextURL':false, 'requestTodownladimage':false});
        }
        else{
            console.log('check why we get into this situation !');
        }
    }

    if(nextStep.enableControlImageChange === true && nextStep.requestNextURL === false && nextStep.requestTodownladimage === false){
        // wait for requestNextURL
        if(nextURLrequested) {
            setNextStep({'enableControlImageChange':false,'requestNextURL':true,'requestTodownladimage':false});
        }
    }

    if(nextStep.enableControlImageChange === false && nextStep.requestNextURL === true && nextStep.requestTodownladimage === false){
        // wait for gotNextURL
        if(gotNextURL){
            setNextStep({'enableControlImageChange':false,'requestNextURL':false,'requestTodownladimage':true});
        }
    }

    if(nextStep.enableControlImageChange === false && nextStep.requestNextURL === false && nextStep.requestTodownladimage === true){
        // wait for image to be downloaded
        if(imagesWasDownloaded){
            setNextStep({'enableControlImageChange':true,'requestNextURL':false, 'requestTodownladimage':false});   
        }
    }
    

    if(!nextURLrequested && !gotNextURL && imagesWasDownloaded) {
        // image was downloaded :enable control to request the next URL 
        setNextStep({'enableControlImageChange':true,'requestNextURL':false, 'requestTodownladimage':false});
    }

    if(!nextURLrequested && gotNextURL && !imagesWasDownloaded ){
        // gotNextURL: request to downloads next image
        setNextStep({'enableControlImageChange':false,'requestNextURL':false, 'requestTodownladimage':true});
    }

},[nextURLrequested, gotNextURL, imagesWasDownloaded, nextStep.enableControlImageChange, nextStep.requestNextURL, nextStep.requestTodownladimage])



return nextStep;

}

export default useStateMachineToInvokeNextStep;
