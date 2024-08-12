import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setPw, setPwChk } from "../../slice/changePwSlice";
import { useEffect, use, useState } from "react";
import passwordStyles from "./ChangePassword.module.css";
import axios from "axios";

function ChangePassword() {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { params } = useParams();

  const pw = useSelector((state) => state.changePw.pw);
  const pwChk = useSelector((state) => state.changePw.pwChk);

  return (
    <div className={passwordStyles.container}>
      <div className={passwordStyles.box}>
        <label htmlFor="changedPw">변경할 비밀번호</label>
        <input
          id="changedPw"
          type="password"
          value={pw}
          onChange={(e) => {
            dispatch(setPw(e.target.value));
          }}
        />
        <br></br>
        <label htmlFor="changedPwChk">비밀번호 재입력</label>
        <input
          id="changedPwChk"
          type="password"
          value={pwChk}
          onChange={(e) => {
            dispatch(setPwChk(e.target.value));
          }}
        />
        <br></br>
        <button>비밀번호 변경!</button>
      </div>
    </div>
  );
}

export default ChangePassword;
