import React, { useState } from "react";
import styles from "./ReservationListDesign.module.css";

function ReservationListForm() {
  const dummyData = [
    {
      userId: "user1",
      seats: [{ name: "A1" }, { name: "A2" }],
      time: new Date(),
    },
    {
      userId: "user2",
      seats: [{ name: "B1" }, { name: "B2" }],
      time: new Date(),
    },
  ];

  const ticketerTableList = dummyData.map((e, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{e.userId}</td>
      <td>{e.seats.map((seat) => seat.name).join(", ")}</td>
      <td>{e.time.toLocaleString()}</td>
      <td>
        <p style={{ color: "blue" }}>예매 완료</p>
      </td>
    </tr>
  ));

  return (
    <>
      <div className={styles.ticketerHeader}>
        <h1 className={styles.titleMain}>예매자 목록</h1>
        <h1 className={styles.titleSub}>총 {dummyData.length}명</h1>
      </div>
      <div className={styles.ticketerListContainer}>
        <table className={styles.tablet} id="mytable">
          <thead>
            <tr>
              <th>목록</th>
              <th>이름</th>
              <th>좌석</th>
              <th>예매일시</th>
              <th>예매 상태</th>
            </tr>
          </thead>
          <tbody>{ticketerTableList}</tbody>
        </table>
      </div>
    </>
  );
}

export default ReservationListForm;
