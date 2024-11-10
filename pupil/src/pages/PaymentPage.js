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
  const selectedSeats = useSelector((state) => state.seat.selectedSeats); // Seat numbers selected by the user
  const col = useSelector((state) => state.seat.col); // Number of columns for seat arrangement
  const navigate = useNavigate();

  // Fetch authenticated user info
  const { data: authData } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await axios.get(
        "http://cndlsrb2739.iptime.org:3000/auth/checkAuth",
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
  });

  const userId = authData?.userId;

  // Fetch session information
  const { data: sessionInfo } = useQuery({
    queryKey: ["sessionInfo", sessionId],
    queryFn: async () => {
      const response = await axios.get(
        `http://cndlsrb2739.iptime.org:3000/sessions/${sessionId}`
      );
      return response.data;
    },
    enabled: !!sessionId,
  });

  // Fetch concert information
  const { data: concertInfo } = useQuery({
    queryKey: ["concertInfo", concertId],
    queryFn: async () => {
      const response = await axios.get(
        `http://cndlsrb2739.iptime.org:3000/concerts/${concertId}`
      );
      return response.data[0];
    },
    enabled: !!concertId,
  });

  // Fetch reservation information
  const { data: reservationInfo } = useQuery({
    queryKey: ["reservationInfo", userId],
    queryFn: async () => {
      const response = await axios.get(
        `http://cndlsrb2739.iptime.org:3000/reservations/${userId}`
      );
      return response.data;
    },
    enabled: !!userId,
  });

  // Format the date and time using moment.js
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

  const handlePaymentClick = async () => {
    try {
      // Reserve each selected seat
      const seatPromises = selectedSeats.map((seatNumber) =>
        axios.put(
          `http://cndlsrb2739.iptime.org:3000/seats/session/${sessionId}`,
          {
            seatNumber,
            seatStatus: "reserved",
          }
        )
      );
      await Promise.all(seatPromises);

      // Fetch the updated seat status
      const seatResponse = await axios.get(
        `http://cndlsrb2739.iptime.org:3000/seats/session/${sessionId}`
      );
      const { success } = seatResponse.data;

      if (success) {
        // For each seat, create a reservation entry
        const reservationPromises = selectedSeats.map(async (seatNumber) => {
          await axios.post(
            `http://cndlsrb2739.iptime.org:3000/reservations/${userId}`, // Create a reservation
            {
              session_id: sessionId,
              seat_id: seatNumber,
              payment_status: "결제완료", // Payment completed
            }
          );
        });

        await Promise.all(reservationPromises);

        alert("결제가 완료되었습니다.");
        navigate("/my-page");
      } else {
        throw new Error("Payment error");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("결제 처리 중 오류가 발생했습니다.");
      navigate("/"); // Redirect on error
    }
  };

  return (
    <Wrapper className={WrapperStyles.paymentWrapper}>
      <h1>예매 페이지</h1>
      <Ticket
        title={concertInfo?.concert_title}
        date={formattedDate}
        location={concertInfo?.concert_location}
        seat={selectedSeats} // Pass the selected seat numbers array
        col={col} // Pass the number of columns
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
