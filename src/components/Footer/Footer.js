import React from "react";
import { Link } from "react-router-dom";
import FooterStyles from "./Footer.module.css";

function Footer() {
  return (
    <div className={FooterStyles.footerContainer}>
      <div className={FooterStyles.footerMenu}>
        <ul className={FooterStyles.footerMenuList}>
          <li>
            <a href="">이용약관</a>
          </li>
          <li>
            <a href="">개인정보처리방침</a>
          </li>
          <li>
            <a href="">공지사항</a>
          </li>
          <li>
            <a href="">로그인</a>
          </li>
        </ul>
      </div>
      <div className={FooterStyles.footerCredit}>
        <div className={FooterStyles.creditBox}>
          <p>Developer</p>
          <p>Obsun wor__yth EastBean chanhk</p>
          <p></p>
        </div>
        <div className={FooterStyles.creditBox}>
          <p>Designer</p>
          <p>haeunU</p>
        </div>
      </div>
      <div className={FooterStyles.footerImgBox}>
        <img src="img/logo/footer-logo.svg" alt="" />
      </div>
    </div>
  );
}
export default Footer;
