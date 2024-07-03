import React from "react";

function Button(props) {
  return (
    <button 
      type={props.type} 
      onClick={props.onClick} 
      className={props.className} // Apply the passed className
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;