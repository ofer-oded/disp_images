import React from 'react';
import ImageCom from './imageCom';
import DisplayControl from './displayControl';
import {useState} from 'react';


const App = () => {
    const [dataRequested,setDataRequestedl] = useState(false);
    const [imageCount,setImageCount] = useState(0)
    const handleDisplayControlClick = () =>
    {
        setDataRequestedl(true);
        var count = imageCount + 1;
        count =  count === 2 ? 0 : count 
        setImageCount(count);
        console.log(count);
    }

    return(
    <div> 
        <ImageCom dataRequested = {imageCount}></ImageCom>
        <div>
        <DisplayControl onClick = {handleDisplayControlClick}> </DisplayControl>
        </div>
    </div>
    );
}

export default App;