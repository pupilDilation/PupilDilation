import { useState } from "react";
import axios from "axios";
import passwordStyles from "./ChangePassword.module.css";

function ChangePasswordDefault() {
  const [id, setId] = useState("");

  async function changePasswordClick(e) {
    try {
      const res = await axios.post("http://localhost:3001/auth/sendmail", {
        userId: id,
      });
      if (res.data.success) {
        alert("가입된 메일로 비밀번호 변경 링크가 전송되었습니다.");
      }
      console.log(res);
    } catch (error) {
      if (error.response.status === 404) {
        alert("가입되지 않은 유저 아이디입니다.");
      }
      console.log(error);
    }
  }

  return (
    <div className={passwordStyles.container}>
      <div className={passwordStyles.box}>
        <label htmlFor="id">비밀번호 변경할 아이디를 입력해주세요.</label>
        <input
          id="id"
          type="text"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <button onClick={changePasswordClick}>이메일 전송!</button>
      </div>
    </div>
  );
}

export default ChangePasswordDefault;
