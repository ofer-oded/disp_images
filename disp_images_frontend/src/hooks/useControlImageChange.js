import { useState } from 'react'
import { useEffect } from "react"


/**
 * This hook triggers a request to get next image URL after a delay and if enabled
 * @param {*} enableControlImageChange 
 */
const useControlImageChange = (enableControlImageChange) => {
    const [requsetNextURL,setRequestNextURL] = useState(false);
    useEffect(
        () => {
        if(enableControlImageChange){
            setTimeout(()=>{
               setRequestNextURL(true);
             },5000)}
        else{
           setRequestNextURL(false);
        }
    },[enableControlImageChange]);
    return(requsetNextURL);
}

export default useControlImageChange;