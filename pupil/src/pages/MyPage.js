import useClassNameJoin from "../hooks/useClassNameJoin";
import Button from "../components/Button/Button";
import ButtonStyles from "../components/Button/Button.module.css";
import UserInfo from "../components/UserInfo/UserInfo";
import Wrapper from "../components/Wrapper/Wrapper";
import WrapperStyles from "../components/Wrapper/Wrapper.module.css";
import Ticket from "../components/Ticket/Ticket";
import ConcertInfo from "../components/ConcertInfo/ConcertInfo";
import { useEffect, useState } from "react";
import axios from "axios";

/**
 * @author: 248Kobe
 * @returns 마이페이지에 들어갈 내용
 * Wrapper 안에 회원 정보 + 예매 내역
 * @description: 마이페이지에서 회원 정보, 예매 내역 조회
 * 회원 정보 수정, 예매 내역 취소 기능 포함
 */
function MyPage() {
  const [user, setUser] = useState({});
  const [reservation, setReservation] = useState([]);
  const [session, setSession] = useState([]);
  const [concert, setConcert] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/checkAuth",
          {
            withCredentials: true,
          }
        );
        if (response.data.authenticated) {
          setUserId(response.data.userId);
          setUserType(response.data.userType);
        }
      } catch (error) {
        console.error("Error checking authentication", error);
      }
    }
    getUserInfo();
  }, []);

  useEffect(() => {
    if (!userId) return;

    async function fetchUser() {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    async function fetchReservationInfo() {
      try {
        const response = await axios.get(
          `http://localhost:3001/reservations/${userId}`
        );
        const reservationData = response.data.reservations;
        setReservation(reservationData);

        const sessionRequests = reservationData.map((reservation) =>
          axios.get(`http://localhost:3001/sessions/${reservation.session_id}`)
        );
        const sessionResponses = await Promise.all(sessionRequests);
        setSession(sessionResponses.map((response) => response.data));

        const concertIds = sessionResponses.map(
          (response) => response.data.concert_id
        );
        const concertRequests = concertIds.map((concertId) =>
          axios.get(`http://localhost:3001/concerts/${concertId}`)
        );
        const concertResponses = await Promise.all(concertRequests);
        setConcert(concertResponses.map((response) => response.data));
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    }
    fetchReservationInfo();
  }, [userId]);

  return (
    <Wrapper className={WrapperStyles.myPageContainer}>
      <div className={ButtonStyles.myPageBtnContainer}>
        <Button className={ButtonStyles.headerBtn}>회원정보 아이콘</Button>
        <Button className={ButtonStyles.headerBtn}>예매내역</Button>
      </div>
      <UserInfo //회원 정보 컴포넌트
        name={user.user_name}
        id={userId}
        email={user.user_email}
        phonenumber={user.user_phone}
      />
      <Wrapper className={WrapperStyles.wrapper}>
        <h1>예매 내역</h1>
      </Wrapper>
      {reservation.length === 0 && <p>No reservations found.</p>}
      {session.map((session, index) => (
        <Ticket
          key={index}
          title={concert[index][0]?.concert_title || "제목"} // Assuming concert object contains title
          date={session.session_date || "날짜"} // Assuming session object contains date
          payment={reservation[index]?.payment_status || "결제상태"} // Adjust as necessary
          location={concert[index][0].concert_location || "학관104호"} // Assuming session object contains location
          seat={reservation[index]?.seat_id || "A열8번"} // Adjust as necessary
          enterTime={session.session_date || "시작시간"} // Assuming session object contains enterTime
        />
      ))}
    </Wrapper>
  );
}

export default MyPage;
