import axios from "axios";
import { useEffect, useState } from "react";
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
  return (
    <>
      <div className={styles.container}>
        <div>
          {admins.map((item) => {
            console.log(item);
            return (
              <AdminCard
                key={item.user_id}
                id={item.user_id}
                name={item.user_name}
                email={item.user_email}
                phone={item.user_phone}
              ></AdminCard>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AdminAccountController;
