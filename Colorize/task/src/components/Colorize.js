import React, { useState } from "react";

function Colorize() {
    
    const [color , setColor] = useState('');

    function changeColor(e){
        setColor(e.target.value);
    }
    
    return(
        <>
        <h1> This is a colourize component</h1>
        <div>
            <label>Enter a colour</label>
            <br/>
            <input type='text' placeholder="Enter a colour" onChange={changeColor}></input>
            <br/>
            <button type="submit" style={{backgroundColor : color}}>Click</button>
        </div>
        </>
    );
}

export default Colorize;