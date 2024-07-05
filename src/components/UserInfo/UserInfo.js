import React from "react";
import Button from "../Button/Button";
import ButtonStyles from "../Button/Button.module.css";
import { Link, useNavigate } from "react-router-dom";
import UserInfoStyles from "./UserInfo.module.css";

function UserInfo() {
  const navigate = useNavigate();
  const changePasswordClick = () => {
    navigate("/");
  };

  return (
    <div className={UserInfoStyles.profileInfo}>
      <h1 className={UserInfoStyles.userTitle}>회원 정보</h1>
      <div className={UserInfoStyles.userInfo}>
        <img
          className={UserInfoStyles.img}
          src="/img/logo/Icon_user.png"
          alt="프로필사진"
        />
        <div className={UserInfoStyles.profileContent}>
          <div className={UserInfoStyles.lineContent}>
            <h1>정은찬님</h1>
            <Button
              className={ButtonStyles.changePasswordBtn}
              onClick={changePasswordClick}
            >
              비밀번호 변경하기
            </Button>
          </div>
          <hr className={UserInfoStyles.hr}></hr>
          <div className={UserInfoStyles.lineContent}>
            <h1>아이디 </h1>
            <h1>chany077</h1>
          </div>
          <div className={UserInfoStyles.lineContent}>
            <h1>이메일 </h1>
            <h1>chany077@gmail.com</h1>
          </div>
          <div className={UserInfoStyles.lineContent}>
            <h1>전화번호 </h1>
            <h1>01040494663</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
