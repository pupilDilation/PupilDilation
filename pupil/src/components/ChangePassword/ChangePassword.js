import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../../slice/loginSlice";
import { setPassword, setPasswordChk } from "../../slice/signUpSlice";
import { useEffect } from "react";
import passwordStyles from "./ChangePassword.module.css";
import SignUpFormStyles from "../SignUp/SignUpForm.module.css";
import Input from "../Input/Input";

function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { params } = useParams();

  return (
    <div className={passwordStyles.container}>
      <div className={passwordStyles.box}>
        <label htmlFor="currentPw">현재 비밀번호</label>
        <input id="currentPw" type="password" />
        <label htmlFor="changedPw">변경할 비밀번호</label>
        <input id="changedPw" type="password" />
        <label htmlFor="changedPwChk">비밀번호 재입력</label>
        <input id="changedPwChk" type="password" />
        <button>비밀번호 변경!</button>
      </div>
    </div>
  );
}

export default ChangePassword;
