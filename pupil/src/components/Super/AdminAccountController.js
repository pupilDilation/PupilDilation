import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import AdminCard from "./AdminCard";
import styles from "./Super.module.css";

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
            <>
              <input type="text" id="username" placeholder="username" />
              <input type="text" id="id" placeholder="id" />
              <input type="text" id="password" placeholder="password" />
              <input type="text" id="phone" placeholder="phone" />
              <input type="text" id="email" placeholder="email" />
            </>
          )}
        </div>
        <div>{adminCards}</div>
      </div>
    </>
  );
}

export default AdminAccountController;
