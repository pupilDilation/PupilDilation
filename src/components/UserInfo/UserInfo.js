import React from "react";
import Button from "../Button/Button";
import Buttonstyles from "../Button/Button.module.css";
import { Link, useNavigate } from "react-router-dom";
import UserInfoStyles from "./UserInfo.module.css";

function UserInfo() {
  const navigate = useNavigate();
  const changePasswordClick = () => {
    navigate("/");
  };

  return (
    <div className={UserInfoStyles.profileInfo}>
      <h1 className="userTitle">회원 정보</h1>
      <div className={UserInfoStyles.userInfo}>
        <img
          className={UserInfoStyles.img}
          src="/img/logo/user.svg"
          alt="프로필사진"
        />
        <div className={UserInfoStyles.profileContent}>
          <div className={UserInfoStyles.lineContent}>
            <h1>이름</h1>
            <Button onClick={changePasswordClick}>비밀번호 변경하기</Button>
          </div>
          <div className={UserInfoStyles.lineContent}>
            <h1>아이디: </h1>
            <h1>chany077</h1>
          </div>
          <div className={UserInfoStyles.lineContent}>
            <h1>이메일: </h1>
            <h1>chany077@gmail.com</h1>
          </div>
          <div className={UserInfoStyles.lineContent}>
            <h1>전화번호: </h1>
            <h1>01040494663</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
