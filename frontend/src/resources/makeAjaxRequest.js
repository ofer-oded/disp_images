import axios from 'axios';
import {useState,useEffect} from 'react'

/*
responsible for requesting data from server
*/



const RequestData = (requestId) => {
    const [imageUrl,setImageUrl] = useState('');

    useEffect(
        () => {
            (async () => {
                const response = await axios.get('http://127.0.0.1:8000/disp_images/');
                setImageUrl(response.data.id);
            }) ();

        },[requestId]
    );
 
    return imageUrl;
}




export default RequestData;