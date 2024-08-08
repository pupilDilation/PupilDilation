import modalStyles from "./Modal.module.css";

/**
 * @author: Jangmyun
 * @description: overlay-뒷배경 rgba 어둡게 처리 / container안에 header와 content 분리하여 스타일링
 */
function Modal(props) {
  // props로 전달된 state로 모달창의 open 여부를 확인해서 null또는 modal 컴포넌트 return
  if (!props.isOpened) return null;

  return (
    <div className={modalStyles.overlay} onClick={props.onClose}>
      <div className={modalStyles.container}>
        <div className={modalStyles.header}>
          <h3>{props.title}</h3>
          <button onClick={props.onClose}>
            <img src="/img/cross_circle.svg" alt="" width={20} />
          </button>
        </div>
        <div className={modalStyles.content}>{props.children}</div>
      </div>
    </div>
  );
}

export default Modal;
