import React from 'react'

const onClickNext = () => {
    console.log('clicked')
}

const DisplayControl = () => {
    return(
        <div>
            <button onClick = {onClickNext}>next image</button>
        </div>
    );
}

export default DisplayControl;