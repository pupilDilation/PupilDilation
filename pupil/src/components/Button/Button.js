import React from "react";

/**
 * @author:
 * @param: props(타입, 온클릭함수, CSS 클래스네임, disabled 여부, 버튼 제목(children))
 * @return: 버튼 컴포넌트
 * @description: 재사용 가능한 버튼 컴포넌트
 */
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
