import React from "react";
import Button from "../Button/Button";
import ButtonStyles from "../Button/Button.module.css";
import { Link, useNavigate } from "react-router-dom";
import UserInfoStyles from "./UserInfo.module.css";

function UserInfo(props) {
  const navigate = useNavigate();
  const changePasswordClick = () => {
    navigate("/");
  };

  return (
    <div className={UserInfoStyles.profileInfo}>
      <h1 className={UserInfoStyles.userTitle}>회원 정보</h1>
      <div className={UserInfoStyles.userInfo}>
        <div className={UserInfoStyles.profileContent}>
          <div className={UserInfoStyles.lineContent}>
            <h1>{props.name}</h1>
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
            <h1>{props.id}</h1>
          </div>
          <div className={UserInfoStyles.lineContent}>
            <h1>이메일 </h1>
            <h1>{props.email}</h1>
          </div>
          <div className={UserInfoStyles.lineContent}>
            <h1>전화번호 </h1>
            <h1>{props.phonenumber}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
