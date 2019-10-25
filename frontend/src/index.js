import React from 'react'
import ReactDOM from 'react-dom'

// using inline styling
// the value must be a javascript object
const App = () => {
    return(
    <div> 
        <img src="20150904_050647.jpg" alt = "not found" style = {{width:"500px" ,height:"600 px"}}></img>
        <div>
        <button>next image</button>
        </div>
    </div>
    );
}

ReactDOM.render(<App></App>,document.querySelector('#root'));


