import React from "react";
import { Link } from "react-router-dom";
import FooterStyles from "./Footer.module.css";

function Footer() {
  return (
    <div className={FooterStyles.footerContainer}>
      <div className={FooterStyles.footerBox}>
        <div className="footer-start">
          <div className="developers-container">
            <div className="developer-title">Developers</div>
            <div className="developer-content">
              Obsun wor__yth EastBean chanhk
            </div>
          </div>
          <div className="designer-container">
            <div className="designer-title">Designer</div>
            <div className="designer-content">haeunU</div>
          </div>
        </div>
        <div className="footer-line">
          <img src="/images/footerLine.svg"></img>
        </div>
        <div className="footer-center">
          <div className="footer-email">
            이용문의 / dghj.cra.handong.gmail.com
          </div>
          <div className="footer-address">
            경북 포항시 북구 흥해읍 한동로 558 한동대학교 37554
          </div>
        </div>
        <div className="footer-line">
          <img src="/images/footerLine.svg"></img>
        </div>
        <div className="footer-end">
          <div className="user-privacy">
            <button className="privacy-button">개인정보처리방침</button>
          </div>
          <div className="terms-of-use">
            <button className="terms-button">이용약관</button>
          </div>
          <div className="end-img">
            <img src="/images/footer-logo.svg"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
