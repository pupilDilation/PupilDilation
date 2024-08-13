import { Routes, Route } from "react-router";
import Wrapper from "../components/Wrapper/Wrapper";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import ChangePasswordDefault from "../components/ChangePassword/ChangePasswordDefault";

function PwChangePage() {
  return (
    <Wrapper>
      <Routes>
        <Route
          index
          element={<ChangePasswordDefault></ChangePasswordDefault>}
        ></Route>
        <Route
          path="/:uuid"
          element={<ChangePassword></ChangePassword>}
        ></Route>
      </Routes>
    </Wrapper>
  );
}

export default PwChangePage;
