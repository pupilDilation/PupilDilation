import { useEffect, useState } from "react";
import styles from "./CreateConcert.module.css";

function SeatSetter({ rows, cols, setDisabledSeats }) {
  const [seats, setSeats] = useState([]);

  // props로 받는 rows cols가 변경될 때마다 seatSetter component 내부의 button을 재렌더링
  useEffect(() => {
    const generateSeats = () => {
      const newSeats = [];
      for (let i = 0; i < rows * cols; i++) {
        newSeats.push(0);
      }
      setSeats(newSeats);
    };
    generateSeats();
  }, [rows, cols]);

  return (
    <div className={styles.seatContainer}>
      <div
        className={styles.seatGrid}
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {seats.map((seat, index) => (
          <button key={`seat-${index}`}>{index + 1}</button>
        ))}
      </div>
    </div>
  );
}

export default SeatSetter;
