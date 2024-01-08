// Square.js
import React from "react";

function Square(props) {
  // Return the JSX code that renders the square component
  return (
    <button className="square" onClick={props.onClick}>
      {props.value} 
    </button>
  );
}

export default Square;
