import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import AdminCard from "./AdminCard";
import styles from "./Super.module.css";
import useFormInput from "../../hooks/useFormInput";
import ImgInput from "../ImgInput/ImgInput";

function AdminAccountController() {
  const [admins, setAdmins] = useState([]);
  const [imgUrl, setImgUrl] = useState("");

  async function getAdminUser() {
    try {
      const res = await axios.get(
        "http://cndlsrb2739.iptime.org:3000/users/admins/get"
      );
      if (res.data.length > 0) {
        setAdmins(res.data);
      }
    } catch (error) {
      console.error("Error fetching the JSON data:", error);
    }
  }
  useEffect(() => {
    getAdminUser();
  }, []);

  const [showInputBox, setShowInputBox] = useState(false);

  const toggleInputBox = () => {
    setShowInputBox((prev) => !prev);
  };

  const initialState = {
    username: "",
    id: "",
    phone: "",
    email: "",
    password: "",
    description: "",
    search: "",
  };

  const [inputForm, handleChange, resetForm] = useFormInput(initialState);

  function isBlank() {
    if (
      inputForm.username === "" ||
      inputForm.password === "" ||
      inputForm.id === "" ||
      inputForm.email === "" ||
      inputForm.phone === "" ||
      inputForm.description === "" ||
      inputForm.search === ""
    ) {
      alert("빈 칸 채워라.");
      return false;
    }
    return true;
  }

  function isValidPhone(phone) {
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(phone) && phone !== "") {
      alert("전화번호 형식 맞춰라.");
      return false;
    } else {
      return true;
    }
  }

  function isValidEmail(mail) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (!emailRegex.test(mail) && mail !== "") {
      alert("이메일 형식 맞춰라.");
      return false;
    }
    return true;
  }

  async function createAdmin() {
    if (
      !(
        isBlank() &&
        isValidPhone(inputForm.phone) &&
        isValidEmail(inputForm.email)
      )
    ) {
      return false;
    }
    try {
      const res = await axios.post(
        "http://cndlsrb2739.iptime.org:3000/club/create/club",
        {
          id: inputForm.id,
          password: inputForm.password,
          name: inputForm.username,
          email: inputForm.email,
          phone: inputForm.phone,
          description: inputForm.description,
          search: inputForm.search,
          img: imgUrl,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        resetForm();
        alert(`${inputForm.id} 어드민 계정 생성 완료`);
      } else if (res.status === 409) {
        alert("이미 가입된 id임");
        return false;
      }
    } catch (error) {
      alert(error);
    }
  }

  const adminCards = useMemo(() => {
    return admins.map((item) => {
      return (
        <AdminCard
          key={item.user_id}
          id={item.user_id}
          name={item.user_name}
          email={item.user_email}
          phone={item.user_phone}
        ></AdminCard>
      );
    });
  }, [admins]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.toolbox}>
          <button onClick={toggleInputBox}>{showInputBox ? "✖︎" : "✚"}</button>
        </div>
        <div className={styles.inputBox}>
          {showInputBox && (
            <div className={styles.inputBox}>
              <ImgInput imgUrl={imgUrl} setImgUrl={setImgUrl}></ImgInput>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username / 동아리 이름"
                value={inputForm.username}
                onChange={handleChange}
              />
              <input
                type="text"
                name="id"
                id="id"
                placeholder="id"
                value={inputForm.id}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={inputForm.password}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="phone"
                value={inputForm.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                name="email"
                id="email"
                placeholder="email"
                value={inputForm.email}
                onChange={handleChange}
              />
              <textarea
                id="description"
                name="description"
                cols="15"
                rows="5"
                placeholder="동아리 설명"
                value={inputForm.description}
                onChange={handleChange}
              ></textarea>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="검색 키워드 (띄어쓰기로 구분)"
                value={inputForm.search}
                onChange={handleChange}
              />
              <button onClick={createAdmin}>어드민(동아리) 계정 생성!</button>
            </div>
          )}
        </div>
        <div>{adminCards}</div>
      </div>
    </>
  );
}

export default AdminAccountController;
