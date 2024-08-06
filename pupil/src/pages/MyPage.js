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
  const [user, setUser] = useState("");
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
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUser();
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
      <Ticket //예매 티켓 컴포넌트
        title="제목"
        date="날짜"
        payment="결제상태"
        location="학관104호"
        seat="A열8번"
        enterTime="시작시간"
      />
    </Wrapper>
  );
}

//Use .map() in the future

export default MyPage;
