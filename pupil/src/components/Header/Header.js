import React from "react";
import Button from "../Button/Button";
import ButtonStyles from "../Button/Button.module.css";
import HeaderStyles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../slice/loginSlice";
import { setUserType } from "../../slice/loginSlice";

/**
 * @author: 248Kobe
 * @returns: 헤더 컴포넌트
 * @description:
 * 로그인, 로그아웃, 회원가입, 마이페이지, 검색 버튼 포함
 * 로그인 상태 관리: admin, superadmin 일 때 파란색, user 일 때 빨간색
 */
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
          !(userType === "admin" || userType === "super") //userType입 admin or super 일 경우 헤더 변경
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
