import passwordStyles from "./ChangePassword.module.css";

function ChangePasswordDefault() {
  return (
    <div className={passwordStyles.container}>
      <div className={passwordStyles.box}>
        <label htmlFor="id">비밀번호 변경할 아이디를 입력해주세요.</label>
        <input type="text" />
        <button>이메일 전송!</button>
      </div>
    </div>
  );
}

export default ChangePasswordDefault;
