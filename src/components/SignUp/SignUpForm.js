import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import ButtonStyles from "../Button/Button.module.css";
import SignUpFormStyles from "../SignUp/SignUpForm.module.css";
import Input from "../Input/Input";
import useClassNameJoin from "../../hooks/useClassNameJoin";

function SignUpForm() {
  //가입완료 버튼 -> 조건 충족시 활성화 되도록
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [passwordChk, setPasswordChk] = useState("");
  const [id, setId] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const passwordRegEx = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,20}$/; //8~20자리 비밀번호 정규식(대소문자, 숫자, 특수문자) 체크
  const idRegEx = /^[A-Za-z0-9]{4,12}$/; //4~12자리 아이디 정규식 체크
  const emailRegEx =
    /^[A-Za-z0-9]([._%+-]?[A-Za-z0-9])*@[A-Za-z0-9]([.-]?[A-Za-z0-9])*\.[A-Za-z]{2,}$/i;
  //메일 정규식 체크

  /* 전화번호 체크, 하이픈 자동생성
  10자리 전화번호 포맷, 13자리 전화번호 포맷 지정하여 사용
  */
  useEffect(() => {
    if (phoneNum.length === 10) {
      setPhoneNum(phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (phoneNum.length === 13) {
      setPhoneNum(
        phoneNum.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [phoneNum]);

  /* 이메일 정규식 체크 */
  const emailCheck = (email) => {
    return emailRegEx.test(email); //형식에 맞을 경우, true 리턴
  };

  /* 전화번호 포맷 지정 후 13자리가 넘어가지 않게 하고 포맷에 맞도록 함 */
  const handlePhoneNumChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only allow numbers
    if (value.length <= 13) {
      setPhoneNum(value);
    }
  };

  /* 아이디 포맷 체크 */
  const idCheck = (id) => {
    return idRegEx.test(id);
  };

  /* 비밀번호 포맷 체크 */
  const passwordCheck = (password) => {
    return passwordRegEx.test(password);
  };

  /* 비밀번호 더블체크 확인 -> 비밀번호와 다르면 체크 */
  const passwordDoubleCheck = (password, passwordChk) => {
    return password === passwordChk;
  };

  /* 폼 체크하고 버튼 disable */
  useEffect(() => {
    const isFormValid =
      idCheck(id) &&
      passwordCheck(password) &&
      emailCheck(email) &&
      passwordDoubleCheck(password, passwordChk) &&
      phoneNum.length <= 13;
    setIsFormValid(isFormValid);
  }, [password, id, email, passwordChk, phoneNum]);

  return (
    <div className={SignUpFormStyles.signUpFormWrapper}>
      <div className={SignUpFormStyles.signUpTopWrapper}>
        <h5 className={SignUpFormStyles.signUpText}>회원가입</h5>
      </div>
      <div className={SignUpFormStyles.signUpBottomWrapper}>
        <div className={SignUpFormStyles.signUpLabels}>이름</div>
        <Input
          placeholder={"이름을 입력해주세요."}
          className={SignUpFormStyles.signUpInputs}
        />

        <div className={SignUpFormStyles.signUpLabels}>전화번호</div>
        <Input
          onChange={handlePhoneNumChange}
          className={SignUpFormStyles.signUpInputs}
          value={phoneNum}
          placeholder={"휴대전화 번호를 입력하세요"}
        />

        <div className={SignUpFormStyles.signUpLabels}>이메일</div>
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
            emailCheck(e.target.value);
          }}
          className={SignUpFormStyles.signUpInputs}
          placeholder={"EX) gildong@example.com"}
        />

        <div className={SignUpFormStyles.signUpLabels}>아이디</div>
        <Input
          onChange={(e) => {
            setId(e.target.value);
            idCheck(e.target.value);
          }}
          className={SignUpFormStyles.signUpInputs}
          placeholder={"4~12자리 영소문자, 숫자"}
        />

        <div className={SignUpFormStyles.signUpLabels}>비밀번호</div>
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            passwordCheck(e.target.value);
          }}
          className={SignUpFormStyles.signUpInputs}
          placeholder={"8~20자리 영문 대소문자, 숫자, 특수문자 포함"}
        />

        <div className={SignUpFormStyles.signUpLabels}>비밀번호 재입력</div>
        <Input
          type="password"
          onChange={(e) => {
            setPasswordChk(e.target.value);
            passwordDoubleCheck(password, e.target.value);
          }}
          className={SignUpFormStyles.signUpInputs}
          placeholder={"비밀번호 확인"}
        />
      </div>
      <div className={SignUpFormStyles.completeBtn}>
        {isFormValid ? (
          <Link to="/login">
            <Button
              className={[ButtonStyles.signUpComplete].join(" ")}
              disabled={!isFormValid}
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
            disabled={!isFormValid}
          >
            가입 완료
          </Button>
        )}
      </div>
    </div>
  );
}

export default SignUpForm;
