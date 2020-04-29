import { useEffect, useState } from "react"
import base_url from '../configs/base_url'


const useToDownloadImagesInBackground = requestedRelativeURL => {
    const [backgroundImage,setBackgroundImageWasDownloaded] = useState({'downloaded':false,'url':''});
    const requestedFullURL = `http://${base_url}:8000/media/${requestedRelativeURL}`;
    
    var downloadingImage = new Image();
    useEffect(() => {
            downloadingImage.onload = () =>{
                setBackgroundImageWasDownloaded({'downloaded':true,'url':requestedFullURL});
        };
        if(requestedRelativeURL !== ''){
          downloadingImage.src = requestedFullURL; // triggers the download
        }
        else {
            setBackgroundImageWasDownloaded({'downloaded':false,'url':''});
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[requestedRelativeURL])
    return backgroundImage;
}

export default useToDownloadImagesInBackground;