import React from "react";
import styles from "./ReservationListDesign.module.css";

function ReservationListForm({ reservations }) {
  console.log("Rendering ReservationListForm with reservations:", reservations);

  const tableRows = reservations.map((reservation, index) => (
    <tr key={reservation.rsv_id} className={styles.tableRow}>
      <td className={styles.tableCell}>{index + 1}</td>
      <td className={styles.tableCell}>{reservation.user_id}</td>
      <td className={styles.tableCell}>{reservation.seat_id}</td>
      <td className={styles.tableCell}>{reservation.payment_status}</td>
    </tr>
  ));

  return (
    <>
      <div className={styles.header}>
        <h1>예약자 명단</h1>
        <h2>예약자 수: {reservations.length}</h2>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>유저 아이디</th>
              <th>좌석</th>
              <th>결제 상태</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </>
  );
}

export default ReservationListForm;
