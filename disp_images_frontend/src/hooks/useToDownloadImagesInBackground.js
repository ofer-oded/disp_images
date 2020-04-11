import { useEffect, useState } from "react"
import base_url from '../configs/base_url'


const useToDownloadImagesInBackground = imageURL => {
    const [downLoadedImageSrc,setImageDownloaded] = useState('');
    const fullUrl = `http://${base_url}:8000/media/${imageURL}`;
    
    var downloadingImage = new Image();
    useEffect(() => {
         downloadingImage.onload = () =>{
            console.log(`downloaded ${fullUrl}`);
            setImageDownloaded(downloadingImage.src);
    }
    console.log(`downloading ${fullUrl}`)
    downloadingImage.src = fullUrl;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[fullUrl])

    return downLoadedImageSrc;
}

export default useToDownloadImagesInBackground;