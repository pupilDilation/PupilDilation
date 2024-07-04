import React from "react";
import Button from "../Button/Button";
import Buttonstyles from "../Button/Button.module.css";
import HeaderStyles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleLogin } from "../../slice/auth/authSlice";

function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/");
    }
    dispatch(toggleLogin());
    console.log(isLoggedIn);
  };
  const handleSignupClick = () => {};

  return (
    <div classNAme={HeaderStyles.headerContainer}>
      <div className={HeaderStyles.firstHeader}>
        {isLoggedIn ? (
          <div className={HeaderStyles.firstHeaderBtnContainer}>
            <Button
              className={Buttonstyles.headerBtn}
              onClick={handleLoginClick}
            >
              로그아웃
            </Button>
          </div>
        ) : (
          <div className={HeaderStyles.firstHeaderBtnContainer}>
            <Button
              className={Buttonstyles.headerBtn}
              onClick={handleLoginClick}
            >
              로그인
            </Button>
            <Button
              className={Buttonstyles.headerBtn}
              onClick={handleSignupClick}
            >
              회원가입
            </Button>
          </div>
        )}
      </div>

      <div className={HeaderStyles.secondHeader}>
        <Link className={HeaderStyles.secondHeaderLogoContainer} to="/">
          <img
            src="/img/logo/header_img.png"
            alt="동공확장"
            className={HeaderStyles.secondHeaderLogo}
          />
        </Link>
        <div className={HeaderStyles.secondHeaderBtnContainer}>
          <img
            src="/img/logo/search.png"
            alt="검색"
            className={HeaderStyles.secondHeaderBtn}
          />
          <Link to="/my-page">
            <img
              src="/img/logo/user.svg"
              alt="유저"
              className={HeaderStyles.secondHeaderBtn}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
