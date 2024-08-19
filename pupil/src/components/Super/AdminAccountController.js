import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import AdminCard from "./AdminCard";
import styles from "./Super.module.css";
import useFormInput from "../../hooks/useFormInput";

function AdminAccountController() {
  const [admins, setAdmins] = useState([]);
  async function getAdminUser() {
    try {
      const res = await axios.get("http://localhost:3001/users/admins/get");
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

  const [inputForm, handleChange] = useFormInput({
    username: "",
    id: "",
    phone: "",
    email: "",
    password: "",
  });

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
              <input
                type="text"
                id="username"
                placeholder="username"
                value={inputForm.username}
                onChange={handleChange}
              />
              <input
                type="text"
                id="id"
                placeholder="id"
                value={inputForm.id}
                onChange={handleChange}
              />
              <input
                type="text"
                id="password"
                placeholder="password"
                value={inputForm.password}
                onChange={handleChange}
              />
              <input
                type="text"
                id="phone"
                placeholder="phone"
                value={inputForm.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                id="email"
                placeholder="email"
                value={inputForm.email}
                onChange={handleChange}
              />
              <button>어드민 계정 생성!</button>
            </div>
          )}
        </div>
        <div>{adminCards}</div>
      </div>
    </>
  );
}

export default AdminAccountController;
