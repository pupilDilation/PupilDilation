import { useQuery, useQueries } from "@tanstack/react-query";
import Button from "../components/Button/Button";
import ButtonStyles from "../components/Button/Button.module.css";
import UserInfo from "../components/UserInfo/UserInfo";
import Wrapper from "../components/Wrapper/Wrapper";
import WrapperStyles from "../components/Wrapper/Wrapper.module.css";
import Ticket from "../components/Ticket/Ticket";
import ConcertInfo from "../components/ConcertInfo/ConcertInfo";
import axios from "axios";

function MyPage() {
  // Query to check authentication
  const authQuery = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3001/auth/checkAuth", {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const userId = authQuery.data?.userId;
  const userType = authQuery.data?.userType;

  // Query to fetch user details
  const userQuery = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3001/users/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });

  // Query to fetch reservations (only for user type)
  const reservationsQuery = useQuery({
    queryKey: ["reservations", userId],
    queryFn: async () => {
      if (userType === "user") {
        const response = await axios.get(
          `http://localhost:3001/reservations/${userId}`
        );
        return response.data.reservations;
      }
      return [];
    },
    enabled: !!userId && userType === "user",
  });

  // Query to fetch session details (only for user type)
  const sessionQueries = useQueries({
    queries:
      userType === "user" && reservationsQuery.data
        ? reservationsQuery.data.map((reservation) => ({
            queryKey: ["session", reservation.session_id],
            queryFn: async () => {
              const response = await axios.get(
                `http://localhost:3001/sessions/${reservation.session_id}`
              );
              return response.data;
            },
            enabled: !!reservation.session_id,
          }))
        : [],
  });

  // Query to fetch concert details based on userType
  const concertQueries = useQueries({
    queries:
      userType === "admin"
        ? [
            {
              queryKey: ["concerts", userId],
              queryFn: async () => {
                const response = await axios.get(
                  `http://localhost:3001/concerts/user/${userId}`
                );
                return response.data;
              },
              enabled: !!userId,
            },
          ]
        : userType === "user"
        ? sessionQueries.map((sessionQuery, index) => {
            const session = sessionQuery.data;
            const url = `http://localhost:3001/concerts/${session?.concert_id}`;

            return {
              queryKey: ["concert", session?.concert_id],
              queryFn: async () => {
                const response = await axios.get(url);
                return response.data[0];
              },
              enabled: !!session?.concert_id,
            };
          }) || []
        : [], // Empty array for 'super' userType
  });

  // Determine loading and error states
  const loading =
    authQuery.isLoading ||
    userQuery.isLoading ||
    reservationsQuery.isLoading ||
    sessionQueries.some((q) => q.isLoading) ||
    concertQueries.some((q) => q.isLoading);
  const error =
    authQuery.error ||
    userQuery.error ||
    reservationsQuery.error ||
    sessionQueries.find((q) => q.error) ||
    concertQueries.find((q) => q.error);

  const informationHeading = (() => {
    switch (userType) {
      case "user":
        return "예매 정보"; // Reservation Information
      case "admin":
        return "공연 관리"; // Concert Management
      case "super":
        return "동아리계정 관리"; // Club Account Management
      default:
        return ""; // Default fallback text if userType does not match any case
    }
  })();

  return (
    <Wrapper className={WrapperStyles.myPageContainer}>
      <div className={ButtonStyles.myPageBtnContainer}>
        <Button className={ButtonStyles.headerBtn}>회원정보 아이콘</Button>
        <Button className={ButtonStyles.headerBtn}>예매내역</Button>
      </div>
      <UserInfo
        name={userQuery.data?.user_name}
        id={userId}
        email={userQuery.data?.user_email}
        phonenumber={userQuery.data?.user_phone}
      />
      <h1
        style={{
          textAlign: "center", // Center-aligns the text
          padding: "20px", // Adds padding around the text
          margin: "10", // Optionally removes default margin if needed
        }}
      >
        {informationHeading}
      </h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {!loading &&
        !error &&
        userType === "user" &&
        reservationsQuery.data.length === 0 && <p>No reservations found.</p>}
      {!loading &&
        !error &&
        userType === "user" &&
        reservationsQuery.data.length > 0 &&
        sessionQueries.map((sessionQuery, index) => (
          <Ticket
            key={index}
            title={concertQueries[index]?.data?.concert_title || "제목"}
            date={sessionQuery?.data?.session_date || "날짜"}
            payment={
              reservationsQuery.data[index]?.payment_status || "결제상태"
            }
            location={concertQueries[index]?.data?.concert_location || "위치"}
            seat={reservationsQuery.data[index]?.seat_id || "좌석"}
            enterTime={sessionQuery?.data?.session_date || "시작시간"}
          />
        ))}
      {!loading && !error && userType === "admin" && (
        <div>
          {concertQueries?.data?.length === 0 ? (
            <p>No concert information found.</p>
          ) : (
            concertQueries[0]?.data?.map((concert, index) => (
              <ConcertInfo key={index} title={concert.concert_title} />
            ))
          )}
        </div>
      )}
      {!loading && !error && userType === "super" && (
        <div>
          <ul>
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
