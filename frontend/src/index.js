import React from 'react'
import ReactDOM from 'react-dom'

// using inline styling
// the value must be a javascript object
const App = () => {
    return(
    <div> 
        <img src="http://127.0.0.1:8000/download/IMG_8926.JPG/" alt = "not found" style = {{width:"500px" ,height:"600 px"}}></img>
        <div>
        <button>next image</button>
        </div>
    </div>
    );
}

ReactDOM.render(<App></App>,document.querySelector('#root'));


