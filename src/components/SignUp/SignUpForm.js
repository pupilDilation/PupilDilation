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
  //가입완료 버튼 -> 조건 충족시 활성화 되도록
  return (
    <div className={SignUpFormStyles.signUpFormWrapper}>
      <div className={SignUpFormStyles.signUpTopWrapper}>
        <h5 className={SignUpFormStyles.signUpText}>회원가입</h5>
      </div>
      <div className={SignUpFormStyles.signUpBottomWrapper}>
        <div className={SignUpFormStyles.signUpLabels}>이름</div>
        <Input className={SignUpFormStyles.signUpInputs} />

        <div className={SignUpFormStyles.signUpLabels}>전화번호</div>
        <Input
          className={SignUpFormStyles.signUpInputs}
          placeholder={"01012345678"}
        />

        <div className={SignUpFormStyles.signUpLabels}>이메일</div>
        <Input
          className={SignUpFormStyles.signUpInputs}
          placeholder={"EX) gildong@example.com"}
        />

        <div className={SignUpFormStyles.signUpLabels}>아이디</div>
        <Input
          className={SignUpFormStyles.signUpInputs}
          placeholder={"4~12자리 영소문자, 숫자"}
        />

        <div className={SignUpFormStyles.signUpLabels}>비밀번호</div>
        <Input
          className={SignUpFormStyles.signUpInputs}
          placeholder={"8~20자리 영문 대소문자, 숫자, 특수문자 포함"}
        />

        <div className={SignUpFormStyles.signUpLabels}>비밀번호 재입력</div>
        <Input
          className={SignUpFormStyles.signUpInputs}
          placeholder={"비밀번호 확인"}
        />
      </div>
      <div className={SignUpFormStyles.signUpBtns}>
        <Button
          className={useClassNameJoin(
            ButtonStyles.buttonCommon,
            ButtonStyles.loginBtn
          )}
        >
          <div className={SignUpFormStyles.signUpCompleteText}>가입 완료</div>
        </Button>
      </div>
    </div>
  );
}

export default SignUpForm;
