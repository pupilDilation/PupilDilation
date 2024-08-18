import { useState } from "react";
import styles from "./Super.module.css";
import useFormInput from "../../hooks/useFormInput";

function AdminCard({ id, name, phone, email }) {
  const [inputForm, handleChange] = useFormInput({
    username: name,
    id: id,
    phone: phone,
    email: email,
    password: "",
  });
  return (
    <div className={styles.adminCardWrapper}>
      <div className={styles.cardContainer}>
        <p>
          <span>{id}</span>
          <span>{name}</span>
        </p>
      </div>
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
      </div>
    </div>
  );
}

export default AdminCard;
