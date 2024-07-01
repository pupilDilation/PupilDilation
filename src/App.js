import React from "react";
import Button from "./components/Button/Button";
import styles from "./components/Button/Button.module.css";
import Main from "./pages/Main";

function App() {
  return (
    <div className="App">
      <Button className={styles.loginBtn} onClick={onClick}>Hi</Button>
      <Main></Main>
    </div>
  );
}

export default App;