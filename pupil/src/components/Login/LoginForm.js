import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import LoginFormStyles from "../Login/LoginForm.module.css";
import Button from "../Button/Button";
import ButtonStyles from "../Button/Button.module.css";
import useClassNameJoin from "../../hooks/useClassNameJoin";
import {
  loginSuccess,
  setId,
  setPassword,
  setUserType,
} from "../../slice/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * @author: 248Kobe
 * @return: 로그인 페이지에 들어갈 로그인 폼
 * @description:
 * handleLoginClick 온클릭 함수에서 유저 정보 확인 후 로그인 관리
 * 로그인 시 로그인 상태 설정, 유저 타입 설정
 */
function LoginForm() {
  const id = useSelector((state) => state.login.id);
  const password = useSelector((state) => state.login.password);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const handleLoginClick = () => {
    const user = data.find(
      (user) => user.username === id && user.password === password
    );
    if (user) {
      dispatch(loginSuccess()); //로그인 상태 변경
      dispatch(setUserType(user.userType)); //유저 타입 설정
      console.log(user.userType);
      navigate("/"); //메인페이지로 이동
      dispatch(setId(""));
      dispatch(setPassword(""));
    } else {
      console.error("Invalid username or password");
    }
  };

  async function loginClicked() {
    try {
      const res = await axios.post(
        "http://localhost:3001/auth/login",
        {
          userId: id,
          password: password,
        },
        { withCredentials: true } // cors 이슈로 withCredentials 옵션 추가
      );
      console.log(res);

      if (!res.data.success) {
        alert("아이디 또는 비밀번호가 일치하지 않습니다");
      }

      dispatch(loginSuccess());
      dispatch(setUserType(res.data.userType));
      dispatch(setId(""));
      dispatch(setPassword(""));
      navigate("/");
    } catch (error) {
      console.log(error);
      console.log("Invalid Login req");
    }
  }

  return (
    <div className={LoginFormStyles.loginWrapper}>
      <div className={LoginFormStyles.loginText}>
        <h5>로그인</h5>
      </div>
      <div className={LoginFormStyles.inputWrapper}>
        <Input
          type="id"
          value={id}
          onChange={(e) => {
            dispatch(setId(e.target.value));
          }}
          className={LoginFormStyles.input1}
          placeholder={"아이디"}
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            dispatch(setPassword(e.target.value));
          }}
          className={LoginFormStyles.input1}
          placeholder={"비밀번호"}
        />
        <div className={LoginFormStyles.saveId}>
          <input
            type="checkbox"
            id="saveIdCheckBox"
            className={LoginFormStyles.saveIdCheckBox}
          />
          <label
            htmlFor="saveIdCheckBox"
            className={LoginFormStyles.saveIdCheckBoxText}
          >
            아이디 저장
          </label>
        </div>
      </div>
      <Button
        className={useClassNameJoin(
          ButtonStyles.buttonCommon,
          ButtonStyles.loginBtn
        )}
        onClick={loginClicked}
      >
        <div className={LoginFormStyles.loginBtnText}>로그인</div>
      </Button>
      <Button
        className={useClassNameJoin(
          ButtonStyles.buttonCommon,
          ButtonStyles.signUpBtn
        )}
        onClick={() => navigate("/signup")}
      >
        <div className={LoginFormStyles.signUpBtnText}>회원가입</div>
      </Button>
    </div>
  );
}

export default LoginForm;
