import axios from "axios";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Ticket from "../components/Ticket/Ticket";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import Button from "../components/Button/Button";
import ButtonStyle from "../components/Button/Button.module.css";
import Wrapper from "../components/Wrapper/Wrapper";
import WrapperStyles from "../components/Wrapper/Wrapper.module.css";

function PaymentPage() {
  const { sessionId, concertId } = useParams();
  const col = useSelector((state) => state.seat.col);
  const selectedSeats = useSelector((state) => state.seat.selectedSeats);
  const navigate = useNavigate();

  // 유저 인증 정보를 가져오는 useQuery
  const { data: authData } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3001/auth/checkAuth", {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const userId = authData?.userId;

  // 세션 정보를 가져오는 useQuery
  const { data: sessionInfo } = useQuery({
    queryKey: ["sessionInfo", sessionId],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3001/sessions/${sessionId}`
      );
      return response.data;
    },
    enabled: !!sessionId,
  });

  // 콘서트 정보를 가져오는 useQuery
  const { data: concertInfo } = useQuery({
    queryKey: ["concertInfo", concertId],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3001/concerts/${concertId}`
      );
      return response.data[0];
    },
    enabled: !!concertId,
  });

  // 예약 정보를 가져오는 useQuery
  const { data: reservationInfo } = useQuery({
    queryKey: ["reservationInfo", userId],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3001/reservations/${userId}`
      );
      console.log(response.data);
      return response.data;
    },
    enabled: !!userId,
  });

  // 날짜 및 시간 포맷팅
  const formattedDate = useMemo(() => {
    if (sessionInfo?.session_date) {
      const date = new Date(sessionInfo.session_date);
      return moment(date).format("YY년 MM월 DD일");
    }
    return "";
  }, [sessionInfo]);

  const formattedTime = useMemo(() => {
    if (sessionInfo?.session_date) {
      const date = new Date(sessionInfo.session_date);
      return moment(date).format("HH시 mm분");
    }
    return "";
  }, [sessionInfo]);

  // 좌석 번호 포맷팅
  const formatSeatNumber = (seatNumber) => {
    const rowIndex = Math.floor((seatNumber - 1) / col);
    const colIndex = (seatNumber - 1) % col;
    const rowLetter = String.fromCharCode(65 + rowIndex);
    return `${rowLetter}${colIndex + 1}`;
  };

  const formattedSeats = selectedSeats.map(formatSeatNumber).sort().join(", ");
  const status = reservationInfo?.reservations?.[0]?.payment_status;

  const handlePaymentClick = async () => {
    try {
      const promises = selectedSeats.map((seatNumber) =>
        axios.put(`http://localhost:3001/seats/session/${sessionId}`, {
          seatNumber,
          seatStatus: "reserved",
        })
      );
      await Promise.all(promises);

      const response = await axios.get(
        `http://localhost:3001/seats/session/${sessionId}`
      );
      const { success, seats } = response.data;

      if (success) {
        alert("결제가 완료되었습니다.");
        // navigate("/"); // 결제 완료 후 리디렉션
      } else {
        throw new Error("Payment error");
      }
    } catch (error) {
      console.error("Payment fetching error", error);
      alert("결제 처리 중 오류가 발생했습니다.");
      navigate("/"); // 오류 시 리디렉션
    }
  };

  return (
    <Wrapper className={WrapperStyles.paymentWrapper}>
      <h1>예매페이지</h1>
      <Ticket
        title={concertInfo?.concert_title}
        date={formattedDate}
        location={concertInfo?.concert_location}
        seat={formattedSeats}
        enterTime={formattedTime}
        payment={reservationInfo?.reservations?.[0]?.payment_status}
      />
      <Button className={ButtonStyle.paymentBtn} onClick={handlePaymentClick}>
        결제하기
      </Button>
    </Wrapper>
  );
}

export default PaymentPage;
