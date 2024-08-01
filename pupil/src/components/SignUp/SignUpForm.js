import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  async function register(e) {
    try {
      const res = await axios.post("http://localhost:3001/auth/register", {
        id: id,
        password: pw,
        name: name,
        email: email,
        phone: phone,
      });
      alert("register success!");
      dispatch(resetAll());
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

      <div className={SignUpFormStyles.signUpLabels}>전화번호</div>
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
        onChange={(e) => {
          dispatch(setPassword(e.target.value));
          dispatch(setIsValidForm());
          console.log(pw);
        }}
      />

      <div className={SignUpFormStyles.signUpLabels}>비밀번호 재입력</div>
      <Input
        className={SignUpFormStyles.signUpInputs}
        placeholder={"비밀번호 확인"}
        value={pwChk}
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
