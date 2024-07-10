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
} from "../../slice/signUpSlice";

function SignUpForm() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.signUp.id);
  const pw = useSelector((state) => state.signUp.password);
  const pwChk = useSelector((state) => state.signUp.passwordChk);
  const email = useSelector((state) => state.signUp.email);
  const phone = useSelector((state) => state.signUp.phone);
  const name = useSelector((state) => state.signUp.name);
  const isValidForm = useSelector((state) => state.signUp.isValidForm);

  console.log(name, phone, email, id, pw, pwChk);

  useEffect(() => {
    if (phone.length === 11) {
      const formattedPhone = phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      dispatch(setPhone(formattedPhone));
    }
  }, [phone]);

  // const handlePhoneNumChange = (e) => {
  //   const value = e.target.value.replace(/[^0-9]/g, ""); // Only allow numbers
  //   if (value.length <= 11) {
  //     setPhoneNum(value);
  //   }
  // };

  useEffect(() => {
    dispatch(setIsValidForm());
  }, [name, phone, email, id, pw, pwChk]);

  return (
    <div className={SignUpFormStyles.signUpFormWrapper}>
      <div className={SignUpFormStyles.signUpTopWrapper}>
        <h5 className={SignUpFormStyles.signUpText}>회원가입</h5>
      </div>
      <div className={SignUpFormStyles.signUpBottomWrapper}>
        <div className={SignUpFormStyles.signUpLabels}>이름</div>
        <Input
          onChange={(e) => {
            dispatch(setName(e.target.value));
          }}
          placeholder={"이름을 입력해주세요."}
          className={SignUpFormStyles.signUpInputs}
        />

        <div className={SignUpFormStyles.signUpLabels}>전화번호</div>
        <Input
          onChange={(e) => {
            dispatch(setPhone(e.target.value));
          }}
          className={SignUpFormStyles.signUpInputs}
          value={phone}
          placeholder={"휴대전화 번호를 입력하세요"}
        />

        <div className={SignUpFormStyles.signUpLabels}>이메일</div>
        <Input
          onChange={(e) => {
            dispatch(setEmail(e.target.value));
          }}
          value={email}
          className={SignUpFormStyles.signUpInputs}
          placeholder={"EX) gildong@example.com"}
        />

        <div className={SignUpFormStyles.signUpLabels}>아이디</div>
        <Input
          onChange={(e) => {
            dispatch(setId(e.target.value));
          }}
          className={SignUpFormStyles.signUpInputs}
          placeholder={"4~12자리 영소문자, 숫자"}
        />

        <div className={SignUpFormStyles.signUpLabels}>비밀번호</div>
        <Input
          type="password"
          // value={password}
          onChange={(e) => {
            dispatch(setPassword(e.target.value));
          }}
          className={SignUpFormStyles.signUpInputs}
          placeholder={"8~20자리 영문 대소문자, 숫자, 특수문자 포함"}
        />

        <div className={SignUpFormStyles.signUpLabels}>비밀번호 재입력</div>
        <Input
          type="password"
          onChange={(e) => {
            dispatch(setPasswordChk(e.target.value));
          }}
          className={SignUpFormStyles.signUpInputs}
          placeholder={"비밀번호 확인"}
        />
      </div>
      <div className={SignUpFormStyles.completeBtn}>
        {isValidForm ? (
          <Link to="/login">
            <Button
              className={[ButtonStyles.signUpComplete].join(" ")}
              disabled={!isValidForm}
            >
              가입 완료
            </Button>
          </Link>
        ) : (
          <Button
            className={[
              ButtonStyles.signUpComplete,
              ButtonStyles.disabledBtn,
            ].join(" ")}
            disabled={!isValidForm}
          >
            가입 완료
          </Button>
        )}
      </div>
    </div>
  );
}

export default SignUpForm;
