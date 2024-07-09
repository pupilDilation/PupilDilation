import React from "react";

/*
Input component
*/
//props로 받아오고 비밀번호는 가려지도록 만들기

function Input(props) {
  return (
    <div>
      <input
        className={props.className}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        name={props.name}
      ></input>
    </div>
  );
}
export default Input;
