import { React, useEffect, useState } from "react";
import Input from "../Input/Input";
import LoginFormStyles from "../Login/LoginForm.module.css";
import Button from "../Button/Button";
import ButtonStyles from "../Button/Button.module.css";
import useClassNameJoin from "../../hooks/useClassNameJoin";
import {
  loginSuccess,
  setId,
  setPassword,
  setIsValidForm,
} from "../../slice/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const id = useSelector((state) => state.login.id);
  const password = useSelector((state) => state.login.password);
  const isValidForm = useSelector((state) => state.signUp.isValidForm);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/dummyData/userData.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching the JSON data:", error));
  }, []);

  useEffect(() => {
    dispatch(setIsValidForm());
  }, [id, password]);

  const handleLoginClick = () => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].username === id && data[i].password === password) {
        dispatch(loginSuccess());
        navigate("/");
      }
    }
  };

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
        onClick={handleLoginClick}
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
