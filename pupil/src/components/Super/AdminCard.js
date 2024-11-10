import { useState } from "react";
import styles from "./Super.module.css";
import useFormInput from "../../hooks/useFormInput";
import axios from "axios";

function AdminCard({ id, name, phone, email }) {
  const [inputForm, handleChange] = useFormInput({
    username: name,
    id: id,
    phone: phone,
    email: email,
    password: "",
  });

  const [showInputBox, setShowInputBox] = useState(false);

  const toggleInputBox = () => {
    setShowInputBox((prev) => !prev);
  };

  async function deleteAdmin() {
    try {
      const res = await axios.delete(
        `http://cndlsrb2739.iptime.org:3000/auth/admindelete/${id}`
      );
      if (res.data.success) {
        return true;
      } else {
        alert("삭제 실패!!");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
    }
  }

  const deleteBtnClicked = () => {
    if (window.confirm("진짜 삭제할거임????")) {
      if (deleteAdmin()) {
        alert("삭제 성공!!");
      }
    }
  };

  return (
    <div className={styles.adminCardWrapper}>
      <div className={styles.cardContainer} onClick={toggleInputBox}>
        <p>
          <span>{id}</span>
          <span>{name}</span>
        </p>
      </div>
      {showInputBox && (
        <>
          <div className={styles.inputBox}>
            <input
              type="text"
              name="username"
              id={`username-${id}`}
              placeholder="username"
              value={inputForm.username}
              onChange={handleChange}
            />
            <input
              type="text"
              name="id"
              id={`id-${id}`}
              placeholder="id"
              value={inputForm.id}
              onChange={handleChange}
            />
            <input
              type="text"
              name="password"
              id={`password-${id}`}
              placeholder="password"
              value={inputForm.password}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              id={`phone-${id}`}
              placeholder="phone"
              value={inputForm.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              id={`email-${id}`}
              placeholder="email"
              value={inputForm.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputButtonBox}>
            <button onClick={deleteBtnClicked}>삭제하기</button>
            <button>수정하기</button>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminCard;
