import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import LoginFormStyles from "../Login/LoginForm.module.css";
import Button from "../Button/Button";
import ButtonStyles from "../Button/Button.module.css";
import useClassNameJoin from "../../hooks/useClassNameJoin";
import { loginSuccess, setId, setPassword } from "../../slice/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const id = useSelector((state) => state.login.id);
  const password = useSelector((state) => state.login.password);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/users")
      .then((response) => {
        console.log("Fetched data: ", response.data);
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching the JSON data:", error));
    console.log(data);
  }, []);

  // useEffect(() => {
  //   fetch("/user")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Fetched data: ", data);
  //       setData(data);
  //     })
  //     .catch((error) => console.error("Error fetching the JSON data:", error));
  // }, []);

  const handleLoginClick = () => {
    const User = data.find(
      (User) => User.user_id === id && User.user_pw === password
    );
    if (User) {
      dispatch(loginSuccess());
      navigate("/");
      dispatch(setId(""));
      dispatch(setPassword(""));
      console.log(id, password);
    } else {
      console.error("Invalid username or password");
    }
  };

  return (
    <div className={LoginFormStyles.loginWrapper}>
      <div className={LoginFormStyles.loginText}>
        <h5>로그인</h5>
      </div>
      <div className={LoginFormStyles.inputWrapper}>
        <Input
          type="text"
          value={id}
          onChange={(e) => {
            dispatch(setId(e.target.value));
            console.log(id);
          }}
          className={LoginFormStyles.input1}
          placeholder={"아이디"}
        />
        <Input
          type="text"
          value={password}
          onChange={(e) => {
            dispatch(setPassword(e.target.value));
            console.log(id);
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
