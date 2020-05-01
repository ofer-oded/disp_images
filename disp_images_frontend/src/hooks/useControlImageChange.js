import { useState } from 'react'
import { useEffect } from "react"


const useControlImageChange = (enableControlImageChange) => {
    const [requsetNextURL,setRequestNextURL] = useState(false);
    useEffect(
        () => {
        if(enableControlImageChange){
            setTimeout(()=>{
                console.log('timeout');
               setRequestNextURL(true);
             },10000)}
        else{
           setRequestNextURL(false);
        }
    },[enableControlImageChange]);
    return(requsetNextURL);
}

export default useControlImageChange;