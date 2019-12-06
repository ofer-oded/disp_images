import React from 'react'
import ImageCom from './imageCom'

// using inline styling
// the value must be a javascript object

const onClickNext = () => {
    console.log('clicked')
}

const App = () => {
    return(
    <div> 
        <ImageCom></ImageCom>
        <div>
        <button onClick = {onClickNext}>next image</button>
        </div>
    </div>
    );
}

export default App;