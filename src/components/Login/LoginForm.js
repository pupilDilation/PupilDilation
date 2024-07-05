import React from "react";
import Input from "../Input/Input";
import LoginFormStyles from "../Login/LoginForm.module.css";
import Button from "../Button/Button";
import Buttonstyles from "../Button/Button.module.css";
import useClassNameJoin from "../../hooks/useClassNameJoin";

function LoginForm() {
  return (
    <div className={LoginFormStyles.loginWrapper}>
      <div className={LoginFormStyles.loginText}>
        <h5>로그인</h5>
      </div>
      <div className={LoginFormStyles.inputWrapper}>
        <Input className={LoginFormStyles.input1} placeholder={"아이디"} />
        <Input className={LoginFormStyles.input1} placeholder={"비밀번호"} />
        <div className={LoginFormStyles.saveIdCheckBox}>
          <input type="checkbox" id="saveIdCheckBox" />
          <label htmlFor="saveIdCheckBox">아이디 저장</label>
        </div>
      </div>
      <Button
        className={useClassNameJoin(
          Buttonstyles.buttonCommon,
          Buttonstyles.loginBtn
        )}
      >
        <div className={LoginFormStyles.loginBtnText}>로그인</div>
      </Button>
    </div>
  );
}

export default LoginForm;
