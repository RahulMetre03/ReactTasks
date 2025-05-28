import React, { useState, useRef } from "react";

function ColorizeButton() {
  const [color, setColor] = useState('');
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault(); // prevent page reload
    const value = inputRef.current.value;
    setColor(value);
  }

  return (
    <>
      <h1>This is a Colourize component</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter a colour</label>
        <br />
        <input 
          type="text" 
          placeholder="Enter a colour" 
          ref={inputRef}
        />
        <br />
        <button type="submit" style={{ backgroundColor: color }}>
          Click
        </button>
      </form>
    </>
  );
}

export default ColorizeButton;
