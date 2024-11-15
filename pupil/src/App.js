import React, { useEffect } from "react";
import Main from "./pages/Main";
import LoginPage from "./pages/Login";
import MyPage from "./pages/MyPage";
import SignUpPage from "./pages/SignUp";
import DetailPage from "./pages/DetailPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Wrapper from "./components/Wrapper/Wrapper";
import WrapperStyles from "./components/Wrapper/Wrapper.module.css";
import SeatSelection from "./components/Seat/SeatSelection";
import CreateConcert from "./components/CreateConcert/CreateConcertForm";
import EditDetailPage from "./pages/EditDetailPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuth } from "./slice/loginSlice";
import Policy from "./pages/Policy";
import Terms from "./pages/Terms";
import Announcement from "./pages/Announcement";
import PwChangePage from "./pages/PwChangePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SuperDetailForm from "./components/Detail/SuperDetailForm";
import PaymentPage from "./pages/PaymentPage";
import ClubDetailPage from "./pages/ClubDetailPage";
import ScannerPage from "./pages/ScannerPage";
import ReservationListPage from "./pages/ReservationListPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
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
                <Route
                  path="/reservations/:concertId"
                  element={<ReservationListPage />}
                />
                <Route path="/details/:concertId" element={<DetailPage />} />
                <Route
                  path="/concert/:concertId/sessions/:sessionId/seats/:userType"
                  element={<SuperDetailForm />}
                ></Route>
                <Route
                  path="/concert/:concertId/sessions/:sessionId/seats"
                  element={<SeatSelection />}
                ></Route>
                <Route
                  path="/concert/:concertId/sessions/:sessionId/seats/payment"
                  element={<PaymentPage />}
                ></Route>
                <Route path="/createdetail" element={<CreateConcert />}></Route>
                <Route
                  path="/editdetail/:concertId"
                  element={<EditDetailPage />}
                ></Route>
                <Route
                  path="/scanner/:concertId"
                  element={<ScannerPage></ScannerPage>}
                ></Route>
                <Route
                  path="/club/:clubId"
                  element={<ClubDetailPage></ClubDetailPage>}
                ></Route>
                <Route path="/announcement" element={<Announcement />}></Route>
                <Route path="/terms" element={<Terms />}></Route>
                <Route path="/policy" element={<Policy />}></Route>
                <Route
                  path="/changepw/*"
                  element={<PwChangePage></PwChangePage>}
                ></Route>
              </Routes>
            </Wrapper>
            <Footer />
          </Router>
        </Wrapper>
      </div>
    </QueryClientProvider>
  );
}

export default App;
