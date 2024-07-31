import React from "react";
import Main from "./pages/Main";
import LoginPage from "./pages/Login";
import MyPage from "./pages/MyPage";
import SignUpPage from "./pages/SignUp";
import DetailPage from "./pages/DetailPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Wrapper from "./components/Wrapper/Wrapper";
import WrapperStyles from "./components/Wrapper/Wrapper.module.css";
import Seat from "./components/Seat/SeatSelection";
import Scanner from "./pages/Scanner";
import ClubList from "./components/Club/ClubList";
import ClubDetail from "./components/Club/ClubDetail";

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
              <Route path="/my-page" element={<MyPage />}></Route>
              <Route path="/detail" element={<DetailPage />}></Route>
              <Route path="/details/:concertId" element={<DetailPage />} />
              <Route path="/seat" element={<Seat />}></Route>
              <Route path="/createdetail" element={<CreateConcert />}></Route>
              <Route path="/scanner" element={<Scanner></Scanner>}></Route>
              <Route path="/clublist" element={<ClubList />}></Route>
              <Route path="/club/:clubId" element={<ClubDetail />}></Route>
            </Routes>
          </Wrapper>
          <Footer />
        </Router>
      </Wrapper>
    </div>
  );
}

export default App;
