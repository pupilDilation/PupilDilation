import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import ButtonStyles from "../Button/Button.module.css";
import SignUpFormStyles from "../SignUp/SignUpForm.module.css";
import Input from "../Input/Input";
import useClassNameJoin from "../../hooks/useClassNameJoin";

//Redux
import { useSelector, useDispatch } from "react-redux";
import {
  setEmail,
  setId,
  setPassword,
  setPasswordChk,
  setPhone,
  setIsValidForm,
  setName,
  resetAll,
} from "../../slice/signUpSlice";
import axios from "axios";

function SignUpForm() {
  const name = useSelector((state) => state.signUp.name);
  const phone = useSelector((state) => state.signUp.phone);
  const email = useSelector((state) => state.signUp.email);
  const id = useSelector((state) => state.signUp.id);
  const pw = useSelector((state) => state.signUp.password);
  const pwChk = useSelector((state) => state.signUp.passwordChk);
  const isValidForm = useSelector((state) => state.signUp.isValidForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 전화번호와 비밀번호 일치여부를 판단해 메시지를 출력해주기
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    isValidPhone(phone);
  }, [phone]);

  useEffect(() => {
    isValidPassword(pw, pwChk);
  }, [pw, pwChk]);

  // 전화번호 형식이 올바른지 체크해서 메시지 표시하는 함수
  function isValidPhone(phoneNum) {
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(phoneNum)) {
      setPhoneError("올바른 전화번호 형식이 아닙니다!");
    } else {
      setPhoneError("");
    }
  }

  // 비밀번호와 비밀번호 확인이 올바른지 체크해서 메시지 표시하는 함수
  function isValidPassword(password, passwordCheck) {
    if (password !== passwordCheck) {
      setPasswordError("비밀번호가 일치하지 않습니다!");
    } else {
      setPasswordError("");
    }
  }

  async function register(e) {
    try {
      const res = await axios.post("http://localhost:3001/auth/register", {
        id: id,
        password: pw,
        name: name,
        email: email,
        phone: phone,
      });
      if (res.data.success) {
        alert("register success");
        dispatch(resetAll());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  //가입완료 버튼 -> 조건 충족시 활성화 되도록
  return (
    <div className={SignUpFormStyles.signUpFormWrapper}>
      <h5 className={SignUpFormStyles.signUpText}>회원가입</h5>

      <div className={SignUpFormStyles.signUpLabels}>이름</div>
      <Input
        className={SignUpFormStyles.signUpInputs}
        placeholder={"김한동"}
        value={name}
        onChange={(e) => {
          dispatch(setName(e.target.value));
          console.log(name);
        }}
      />

      <div className={SignUpFormStyles.signUpLabels}>
        <span>전화번호</span>
        {phoneError && (
          <span className={SignUpFormStyles.errorMessage}>{phoneError}</span>
        )}
      </div>
      <Input
        className={SignUpFormStyles.signUpInputs}
        placeholder={"010-1234-5678"}
        value={phone}
        onChange={(e) => {
          dispatch(
            setPhone(
              e.target.value
                .replace(/[^0-9]/g, "")
                .replace(
                  /(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g,
                  "$1-$2-$3"
                )
            )
          );
          console.log(phone);
        }}
      />

      <div className={SignUpFormStyles.signUpLabels}>이메일</div>
      <Input
        className={SignUpFormStyles.signUpInputs}
        placeholder={"EX) handong@example.com"}
        value={email}
        onChange={(e) => {
          dispatch(setEmail(e.target.value));
          dispatch(setIsValidForm());
          console.log(email);
        }}
      />

      <div className={SignUpFormStyles.signUpLabels}>아이디</div>
      <Input
        className={SignUpFormStyles.signUpInputs}
        placeholder={"4~12자리 영소문자, 숫자"}
        value={id}
        onChange={(e) => {
          dispatch(setId(e.target.value));
          dispatch(setIsValidForm());
          console.log(id);
        }}
      />

      <div className={SignUpFormStyles.signUpLabels}>비밀번호</div>
      <Input
        className={SignUpFormStyles.signUpInputs}
        placeholder={"8~20자리 영문 대소문자, 숫자, 특수문자 포함"}
        value={pw}
        type={"password"}
        onChange={(e) => {
          dispatch(setPassword(e.target.value));
          dispatch(setIsValidForm());
          console.log(pw);
        }}
      />

      <div className={SignUpFormStyles.signUpLabels}>
        <span>비밀번호 재입력</span>{" "}
        {passwordError && (
          <span className={SignUpFormStyles.errorMessage}>{passwordError}</span>
        )}
      </div>
      <Input
        className={SignUpFormStyles.signUpInputs}
        placeholder={"비밀번호 확인"}
        value={pwChk}
        type={"password"}
        onChange={(e) => {
          dispatch(setPasswordChk(e.target.value));
          dispatch(setIsValidForm());
          console.log(pwChk, isValidForm);
        }}
      />

      <div className={SignUpFormStyles.signUpBtns}>
        <Button
          className={useClassNameJoin(
            ButtonStyles.buttonCommon,
            ButtonStyles.loginBtn
          )}
          onClick={register}
        >
          <div className={SignUpFormStyles.signUpCompleteText}>가입 완료</div>
        </Button>
      </div>
    </div>
  );
}

export default SignUpForm;
