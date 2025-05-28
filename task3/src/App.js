
import React, { useState } from "react";

function App() {
  // Initial states
  const [currentState, setCurrentState] = useState("Hello World");
  const [lastSavedState, setLastSavedState] = useState("Hello World");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCurrentState(e.target.value);
    setMessage(""); // Clear message on edit
  };

  const handleSave = () => {
    if (currentState !== lastSavedState) {
      // Save logic here (for demo, just console.log)
      console.log("Saving:", currentState);

      setLastSavedState(currentState);
      setMessage("Content saved!");
    } else {
      setMessage("No changes to save.");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h3>Edit Text and Save</h3>
      <textarea
        rows={5}
        cols={40}
        value={currentState}
        onChange={handleChange}
      />
      <br />
      <button onClick={handleSave} style={{ marginTop: 10 }}>
        Save
      </button>
      <p>{message}</p>
    </div>
  );
}

export default App;
