import axios from 'axios';
import {useState,useEffect} from 'react'
import base_url from '../configs/base_url'

/*
responsible for requesting data from server
*/



const useResourceToGetURL = (requestToGetNextURL) => {
    const [responseId,setImageUrl] = useState({id:'',index:-1});
  
    useEffect(
        () => {
             (async () => {
                 if(requestToGetNextURL){
                    console.log('next url requested');
                    const response = await axios.get(`http://${base_url}:8000/disp_images/`,{
                        params:{
                            IMAGE_INDEX:responseId.index
                        }
                    })
                   // const response = await axios.get(`http://${base_url}:8000/disp_images/`);
                   setImageUrl(response.data);
                 }
                 else{
                    // setImageUrl({id:'',index:-1});
                 }
            }) ();
        },[requestToGetNextURL,responseId.id,responseId.index]
    );
    return responseId.id;
    
}




export default useResourceToGetURL;