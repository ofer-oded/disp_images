import React from 'react'
import ReactInterval from 'react-interval';
//import {useState} from 'react';

/*
responsible for controlling images display
*/

const DisplayControl = (props) => {
    //const [enableEvents,setEnableEvent] = useState(true)
    /*
    useEffect( () => {
        setEnableEvent(props.enableRequests)
    },[enableEvents, props.enableRequests]
    )*/
  
    const callInterval = () => {
        console.log(props.enableRequests);
        if(props.enableRequests){
        return (
            <div>
            <ReactInterval timeout={5000} enabled={true}
              callback={props.onClick}
              />
          </div>
        )}
        else{
            return (
                <div></div>
            );
        }
    }


    return(
        <div>
            <button onClick = {props.onClick}>next image</button>
        </div>,
        callInterval()
    );
}

export default DisplayControl