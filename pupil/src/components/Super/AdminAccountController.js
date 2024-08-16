import axios from "axios";
import { useEffect, useState } from "react";
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
  return (
    <>
      <div className={styles.container}>
        <div>
          {admins.map((item) => {
            console.log(item);
            return <div key={item.user_id}>{item.user_id}</div>;
          })}
        </div>
      </div>
    </>
  );
}

export default AdminAccountController;
