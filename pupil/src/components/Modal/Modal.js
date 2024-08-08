import modalStyles from "./Modal.module.css";

/**
 * @author: Jangmyun
 * @description: overlay-뒷배경 rgba 어둡게 처리 / container안에 header와 content 분리하여 스타일링
 */
function Modal() {
  return (
    <div className={modalStyles.overlay} onClick={props.onClose}>
      <div className={modalStyles.container}>
        <div className={modalStyles.header}>
          <h4>{props.title}</h4>
          <button onClick={props.onClose}>
            <img src="/cross_circle.svg" alt="" width={30} />
          </button>
        </div>
        <div className={modalStyles.content}>{props.children}</div>
      </div>
    </div>
  );
}

export default Modal;
