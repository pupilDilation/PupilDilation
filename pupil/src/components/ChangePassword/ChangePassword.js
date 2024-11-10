import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setPw, setPwChk } from "../../slice/changePwSlice";
import { useEffect, use, useState } from "react";
import passwordStyles from "./ChangePassword.module.css";
import axios from "axios";

/**
 * @author: Jangmyun
 * @returns: 비밀번호 변경 컴포넌트
 * @description:
 * 이메일 클릭시 이동하는 비밀번호 변경
 * 이메일 통하므로 추가 인증 구현 x
 * url 파라미터로 누구의 비밀번호를 변경할지 결정하여 put 요청
 */
function ChangePassword() {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uuid } = useParams();

  console.log(uuid);

  const pw = useSelector((state) => state.changePw.pw);
  const pwChk = useSelector((state) => state.changePw.pwChk);

  async function changeBtnClicked() {
    if (pw != pwChk) return;

    try {
      const res = await axios.put(
        "http://cndlsrb2739.iptime.org:3000/auth/changepassword",
        {
          uuid: uuid,
          pw: pw,
        }
      );
      if (res.data.success) {
        alert("비밀번호가 성공적으로 변경되었습니다!");
        navigate("/");
      } else if (res.status === 404) {
        alert(res.data.message);
      }
    } catch (error) {
      if (error.response.status === 500) {
        alert("알 수 없는 오류!", error.response.message);
      } else if (error.response.status === 404) {
        console.log("404 Not Found");
      }
    }
  }

  return (
    <div className={passwordStyles.container}>
      <div className={passwordStyles.box}>
        {pw == pwChk ? null : (
          <>
            <span>비밀번호가 일치하지 않습니다.</span>
            <br />
          </>
        )}
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
        <button onClick={changeBtnClicked}>비밀번호 변경!</button>
      </div>
    </div>
  );
}

export default ChangePassword;
