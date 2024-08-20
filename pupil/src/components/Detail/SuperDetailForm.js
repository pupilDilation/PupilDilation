import { useParams } from "react-router";
import Wrapper from "../Wrapper/Wrapper";

function SuperDetailForm() {
  const { userType } = useParams();

  return (
    <Wrapper>
      <h1>관리자({userType}) 페이지</h1>
      <div>공연관리</div>
    </Wrapper>
  );
}

export default SuperDetailForm;
