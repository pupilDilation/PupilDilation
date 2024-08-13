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
  const [reservations, setReservations] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        } else {
          setError("User not authenticated");
        }
      } catch (error) {
        setError("Error checking authentication");
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
        setError("Error fetching user data");
        console.error("Error fetching user data:", error);
      }
    }
    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    async function fetchReservationInfo() {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3001/reservations/${userId}`
        );
        const reservationData = response.data.reservations;
        setReservations(reservationData);

        // Fetch session details
        const sessionRequests = reservationData.map((reservation) =>
          axios.get(`http://localhost:3001/sessions/${reservation.session_id}`)
        );
        const sessionResponses = await Promise.all(sessionRequests);
        const sessionsData = sessionResponses.map((response) => response.data);
        setSessions(sessionsData);

        // Fetch concert details
        const concertIds = sessionsData.map((session) => session.concert_id);
        const concertRequests = concertIds.map((concertId) =>
          axios.get(`http://localhost:3001/concerts/${concertId}`)
        );
        const concertResponses = await Promise.all(concertRequests);
        const concertsData = concertResponses.map(
          (response) => response.data[0]
        );
        setConcerts(concertsData);
      } catch (error) {
        setError("Error fetching reservation data");
        console.error("Error fetching reservation data:", error);
      } finally {
        setLoading(false);
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
      <UserInfo // 회원 정보 컴포넌트
        name={user.user_name}
        id={userId}
        email={user.user_email}
        phonenumber={user.user_phone}
      />

      {loading && <p>Loading...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading &&
        !error &&
        userType === "user" &&
        reservations.length === 0 && <p>No reservations found.</p>}
      {!loading &&
        !error &&
        userType === "user" &&
        reservations.length > 0 &&
        sessions.map((session, index) => (
          <Ticket
            key={index} // key is needed to uniquely identify each item in a list and prevent rendering issues.
            title={concerts[index]?.concert_title || "제목"}
            date={session.session_date || "날짜"}
            payment={reservations[index]?.payment_status || "결제상태"}
            location={concerts[index]?.concert_location || "학관104호"}
            seat={reservations[index]?.seat_id || "A열8번"}
            enterTime={session.session_date || "시작시간"}
          />
        ))}
      {!loading && !error && userType === "admin" && (
        <div>
          <h1>Concert Info</h1>
          {concerts.length === 0 ? (
            <p>No concert information found.</p>
          ) : (
            concerts.map((concert, index) => (
              <ConcertInfo key={index} concert={concert} />
            ))
          )}
        </div>
      )}
      {!loading && !error && userType === "super" && (
        <div>
          <h1>Admin List</h1>
          <ul>
            {/* Assuming you have an API to fetch the list of admins */}
            <li>Admin 1</li>
            <li>Admin 2</li>
            <li>Admin 3</li>
          </ul>
        </div>
      )}
    </Wrapper>
  );
}

export default MyPage;
