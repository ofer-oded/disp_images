import React from 'react'
import ReactInterval from 'react-interval';

/*
responsible for controlling inages display
*/

const DisplayControl = (props) => {
    return(
        <div>
            <button onClick = {props.onClick}>next image</button>
        </div>,
        <div>
        <ReactInterval timeout={2000} enabled={true}
          callback={props.onClick} />
      </div>
    );
}

export default DisplayControl;