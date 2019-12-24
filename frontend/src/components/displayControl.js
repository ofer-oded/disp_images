import React from 'react'

/*
responsible for controlling inages display
*/

const DisplayControl = (props) => {
    return(
        <div>
            <button onClick = {props.onClick}>next image</button>
        </div>
    );
}

export default DisplayControl;