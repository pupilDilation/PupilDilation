import React from "react";
import Button from "../Button/Button";
import ButtonStyles from "../Button/Button.module.css";
import { Link, useNavigate } from "react-router-dom";
import UserInfoStyles from "./UserInfo.module.css";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

function UserInfo(props) {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.login.id);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  async function changePasswordClick(e) {
    if (!isLoggedIn) {
      // login 상태 아닐 시 이메일 전송하지 않음
      return;
    }
    try {
      const res = await axios.post("http://localhost:3001/auth/sendmail", {
        userId: userId,
      });
      console.log(res.data);
      if (res.data.success) {
        alert("가입된 메일로 비밀번호 변경 링크가 전송되었습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  }

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
