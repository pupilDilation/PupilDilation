import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Wrapper from "../Wrapper/Wrapper";
import SeatSelection from "../Seat/SeatSelection";
import axios from "axios";
import Button from "../Button/Button";
import { toggleSeat, clearSelectedSeats } from "../../slice/seatSlice";
import { useDispatch, useSelector } from "react-redux";
import WrapperStyles from "../Wrapper/Wrapper.module.css";
import SuperDetailFormStyles from "./SuperDetailForm.module.css";
import ButtonStyles from "../Button/Button.module.css";

function SuperDetailForm() {
  const { userType, sessionId } = useParams();
  const [seats, setSeats] = useState([]);
  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) => state.seat.selectedSeats);
  const col = useSelector((state) => state.seat.col);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/seats/session/${sessionId}`
        );
        if (response.data.success) {
          setSeats(response.data.seats);
        }
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, [sessionId]);

  const handleAdminSeatSelect = useCallback(
    (selectedSeat) => {
      dispatch(toggleSeat(selectedSeat));
    },
    [dispatch]
  );

  const handleApplyChanges = async () => {
    try {
      const promises = selectedSeats.map((seatNumber) =>
        axios.put(`http://localhost:3001/seats/session/${sessionId}`, {
          seatNumber,
          seatStatus: "disabled",
        })
      );

      await Promise.all(promises);

      const response = await axios.get(
        `http://localhost:3001/seats/session/${sessionId}`
      );
      if (response.data.success) {
        setSeats(response.data.seats);
        dispatch(clearSelectedSeats());
      }

      alert("좌석 상태가 성공적으로 변경되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("좌석 상태 변경 중 오류 발생:", error);
      alert(
        `좌석 상태 변경에 실패했습니다: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };
  const handleResetChanges = () => {
    dispatch(clearSelectedSeats());
  };
  const formatSeatNumber = (seatNumber) => {
    const rowIndex = Math.floor((seatNumber - 1) / col);
    const colIndex = (seatNumber - 1) % col;
    const rowLetter = String.fromCharCode(65 + rowIndex);
    return `${rowLetter}${colIndex + 1}`;
  };

  const formattedSeats = selectedSeats.map(formatSeatNumber).sort().join(", ");
  return (
    <Wrapper className={WrapperStyles.paymentWrapper}>
      <h1>관리자({userType}) 페이지</h1>
      <SeatSelection
        isAdmin={true}
        onAdminSelect={handleAdminSeatSelect}
        sessionId={sessionId}
        seats={seats}
      />
      <div className={SuperDetailFormStyles.adminBottom}>
        <h2>선택된 비활성화 좌석:</h2>
        {formattedSeats}

        <div className={SuperDetailFormStyles.bottomBtn}>
          <Button
            onClick={handleApplyChanges}
            className={ButtonStyles.applyBtn}
          >
            변경사항 적용
          </Button>
          <Button
            onClick={handleResetChanges}
            className={ButtonStyles.resetBtn}
          >
            초기화
          </Button>
        </div>
      </div>
    </Wrapper>
  );
}

export default SuperDetailForm;
