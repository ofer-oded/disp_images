import React from 'react'
import axios from 'axios'

const onClickNext = async () => {
    try {
    const response = await axios.get('http://127.0.0.1:8000/disp_images/');
    console.log(response);
    } catch(error) {
        console.error(error)
    }
    

}

const DisplayControl = () => {
    return(
        <div>
            <button onClick = {onClickNext}>next image</button>
        </div>
    );
}

export default DisplayControl;