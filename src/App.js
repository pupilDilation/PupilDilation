import React from "react";
import Main from "./pages/Main";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import DetailPage from "./pages/DetailPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/detail" element={<DetailPage />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
