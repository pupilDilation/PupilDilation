import React from "react";
import Main from "./pages/Main";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Wrapper from "./components/Wrapper/Wrapper";
import WrapperStyles from "./components/Wrapper/Wrapper.module.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Wrapper className={WrapperStyles.routerWrapper}>
        <Router>
          <Header />
          <Wrapper className={WrapperStyles.routesWrapper}>
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/signup" element={<SignUpPage />}></Route>
              <Route path="/detail" element={<div>Detail Page</div>}></Route>
            </Routes>
          </Wrapper>
          <Footer />
        </Router>
      </Wrapper>
    </div>
  );
}

export default App;
