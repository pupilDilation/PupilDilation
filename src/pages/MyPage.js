import useClassNameJoin from "../hooks/useClassNameJoin";
import Button from "../components/Button/Button";
import ButtonStyles from "../components/Button/Button.module.css";
import UserInfo from "../components/UserInfo/UserInfo";
import Wrapper from "../components/Wrapper/Wrapper";
import WrapperStyles from "../components/Wrapper/Wrapper.module.css";
import Ticket from "../components/Ticket/Ticket";

function MyPage() {
  return (
    <Wrapper className={WrapperStyles.myPageContainer}>
      <div className={ButtonStyles.myPageBtnContainer}>
        <Button className={ButtonStyles.headerBtn}>회원정보 아이콘</Button>
        <Button className={ButtonStyles.headerBtn}>예매내역</Button>
      </div>
      <UserInfo
        name="정은찬"
        id="chany077"
        email="chany077@gmail.com"
        phonenumber="01040494663"
      />
      <Ticket
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
