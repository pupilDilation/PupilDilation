import React from "react";
import Button from "../Button/Button";
import ButtonStyles from "../Button/Button.module.css";
import { Link, useNavigate } from "react-router-dom";
import TicketStyles from "./Ticket.module.css";

function Ticket(props) {
  const navigate = useNavigate();

  return (
    <div className={TicketStyles.ticketContainer}>
      <div className={TicketStyles.firstLine}>
        <h1>{props.title}</h1>
        <h1>{props.date}</h1>
        <h1>{props.payment}</h1>
      </div>
      <div className={TicketStyles.secondLine}>
        <div className={TicketStyles.ticketPicture}>
          <img
            src="img/loadImage.png"
            className={TicketStyles.showPoster}
          ></img>
          <h1 className={TicketStyles.seatNumber}>{props.seat}</h1>
        </div>
        <div className={TicketStyles.ticketInfo}>
          <div>
            <h1 className={TicketStyles.labels}>장소</h1>
            <h1>{props.location}</h1>
          </div>
          <div>
            <h1 className={TicketStyles.labels}>좌석번호</h1>
            <h1>{props.seat}</h1>
          </div>
          <div>
            <h1 className={TicketStyles.labels}>입장시작</h1>
            <h1>{props.enterTime}</h1>
          </div>
        </div>
        <div className={TicketStyles.ticketQRButton}>
          <img></img>
          <Button>환불</Button>
          <Link className={TicketStyles.showInfoLink}>공연정보</Link>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
