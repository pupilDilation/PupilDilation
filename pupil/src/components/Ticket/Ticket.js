import React, { useState } from "react";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import TicketStyles from "./Ticket.module.css";
import { QRCodeSVG } from "qrcode.react";

function Ticket(props) {
  const seatnum = props.seat;
  const column = props.col;

  const [isQRCodeExpanded, setIsQRCodeExpanded] = useState(false);

  const toggleQR = () => {
    setIsQRCodeExpanded(!isQRCodeExpanded);
  };

  const handleCloseQr = () => {
    setIsQRCodeExpanded(false);
  };

  const formatSeatNumber = () => {
    const rowIndex = Math.floor((seatnum - 1) / column);
    const colIndex = (seatnum - 1) % column;
    const rowLetter = String.fromCharCode(65 + rowIndex);
    return `${rowLetter}${colIndex + 1}`;
  };

  return (
    <>
      <div className={TicketStyles.ticketContainer}>
        {/* First Line with stacked elements */}
        <div className={TicketStyles.firstLine}>
          <h1 className={TicketStyles.title}>{props.title}</h1>
          <div>
            <h1 className={TicketStyles.date}>{props.date}</h1>
            <h1 className={TicketStyles.payment}>{props.payment}</h1>
          </div>
        </div>

        <div className={TicketStyles.secondLine}>
          {/* Ticket Picture Section */}
          <div className={TicketStyles.ticketPicture}>
            <img
              src="/img/loadImage.png"
              className={TicketStyles.showPoster}
              alt="Concert Poster"
            />
          </div>

          {/* Ticket Info Section */}
          <div className={TicketStyles.ticketInfo}>
            <div>
              <h1 className={TicketStyles.labels}>장소</h1>
              <h1>{props.location}</h1>
            </div>
            <div>
              <h1 className={TicketStyles.labels}>좌석번호</h1>
              <h1>{formatSeatNumber()}</h1>
            </div>
            <div>
              <h1 className={TicketStyles.labels}>입장시작</h1>
              <h1>{props.enterTime}</h1>
            </div>
          </div>

          {/* Ticket Actions Section */}
          <div className={TicketStyles.ticketActions}>
            <QRCodeSVG
              className={TicketStyles.qrCode}
              onClick={toggleQR}
            ></QRCodeSVG>
            <Button className={TicketStyles.refundButton}>환불</Button>
            <Link to="/concert-info" className={TicketStyles.showInfoLink}>
              공연정보
            </Link>
          </div>
        </div>
      </div>
      {isQRCodeExpanded && (
        <div className={TicketStyles.qrOverlay} onClick={handleCloseQr}>
          <div className={TicketStyles.qrCodeExpanded}>
            <QRCodeSVG className={TicketStyles.qrCode2}></QRCodeSVG>
          </div>
        </div>
      )}
    </>
  );
}

export default Ticket;
