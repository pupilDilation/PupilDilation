import React from "react";
import Input from "../Input/Input";
import InputStyles from "../Login/LoginForm.module.css";
import Button from "../Button/Button";
import Buttonstyles from "../Button/Button.module.css";

function LoginForm() {
  return (
    <div className={InputStyles.loginWrapper}>
      <div className={InputStyles.loginText}>
        <h5>로그인</h5>
      </div>
      <div className={InputStyles.inputWrapper}>
        <Input className={InputStyles.input1} placeholder={"아이디"} />
        <Input className={InputStyles.input1} placeholder={"비밀번호"} />
        <div className={InputStyles.saveIdCheckBox}>
          <input type="checkbox" id="saveIdCheckBox" />
          <label htmlFor="saveIdCheckBox">아이디 저장</label>
        </div>
      </div>
      <Button className={Buttonstyles.loginBtn}>
        <div className={InputStyles.loginBtnText}>로그인</div>
      </Button>
      <Button className={Buttonstyles.signUpBtn}>
        <div className={InputStyles.signUpBtnText}>회원가입</div>
      </Button>
    </div>
  );
}

export default LoginForm;
