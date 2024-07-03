import React from "react";
import Button from "./components/Button/Button";
import styles from "./components/Button/Button.module.css";
import Main from "./pages/Main";
import LoginPage from "./pages/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
        </Routes>
      <Footer/>
      </Router>
    </div>
  );
}

export default App;