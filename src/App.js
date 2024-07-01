import React from "react";
import Button from "./components/Button/Button";
import styles from "./components/Button/Button.module.css";

function App() {
  return (
    <div className="App">
      <Button className={styles.loginBtn} onClick={onClick}>Hi</Button>
    </div>
  );
}

export default App;