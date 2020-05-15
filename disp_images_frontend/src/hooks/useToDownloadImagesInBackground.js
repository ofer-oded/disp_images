import { useEffect, useState } from "react"
import base_url from '../configs/base_url'
/**
 * This hook download an image at background and update state when downloaded
 * Later the browser will use the cache in order to display it
 * @param {*} requestedRelativeURL 
 */

const useToDownloadImagesInBackground = (requestedRelativeURL,requestedTodownloadimage) => {
    const [backgroundImage,setBackgroundImageWasDownloaded] = useState({'downloaded':false,'url':''});
    const requestedFullURL = `http://${base_url}:8000/media/${requestedRelativeURL}`;
    
    var downloadingImage = new Image();
    useEffect(() => {
            downloadingImage.onload = () =>{
                setBackgroundImageWasDownloaded({'downloaded':true,'url':requestedFullURL});
        };
        if(requestedTodownloadimage){
            if(requestedRelativeURL !== ''){
            downloadingImage.src = requestedFullURL; // triggers the download
            }
        }
        else {
            setBackgroundImageWasDownloaded({'downloaded':false,'url':''});
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[requestedRelativeURL,requestedTodownloadimage])
    return backgroundImage;
}

export default useToDownloadImagesInBackground;