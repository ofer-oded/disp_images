import axios from 'axios';
import {useState,useEffect} from 'react'
import base_url from '../configs/base_url'

/*
responsible for requesting data from server
*/



const useResourceToGetURL = (requestToGetNextURL) => {
    const [imageUrl,setImageUrl] = useState('');
  
    useEffect(
        () => {
             (async () => {
                 if(requestToGetNextURL){
                    const response = await axios.get(`http://${base_url}:8000/disp_images/`);
                    setImageUrl(response.data.id);
                 }
                 else{
                     setImageUrl('');
                 }
            }) ();
        },[requestToGetNextURL]
    );
    return imageUrl;
}




export default useResourceToGetURL;