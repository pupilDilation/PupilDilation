import React from "react";
import Button from "../Button/Button";
import ButtonStyles from "../Button/Button.module.css";
import HeaderStyles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../slice/loginSlice";
import { setUserType } from "../../slice/loginSlice";

function Header() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const userType = useSelector((state) => state.login.userType);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
    dispatch(setUserType(""));
    navigate("/");
  };

  return (
    <div className={HeaderStyles.headerContainer}>
      <div
        className={
          !(userType === "admin" || userType === "super")
            ? HeaderStyles.firstUserHeader
            : HeaderStyles.firstAdminHeader
        }
      >
        {isLoggedIn ? (
          <div className={HeaderStyles.firstHeaderBtnContainer}>
            <Button
              className={ButtonStyles.headerBtn}
              onClick={handleLogoutClick}
            >
              로그아웃
            </Button>
          </div>
        ) : (
          <div className={HeaderStyles.firstHeaderBtnContainer}>
            <Button
              className={ButtonStyles.headerBtn}
              onClick={() => navigate("/login")}
            >
              로그인
            </Button>
            <Button
              className={ButtonStyles.headerBtn}
              onClick={() => navigate("/signup")}
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
        {isLoggedIn ? (
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
        ) : (
          <div className={HeaderStyles.secondHeaderBtnContainer}>
            <img
              src="/img/logo/search.png"
              alt="검색"
              className={HeaderStyles.secondHeaderBtn}
            />
            <Link to="/">
              <img
                src="/img/logo/user.svg"
                alt="유저"
                className={HeaderStyles.secondHeaderBtn}
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
