import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/userSlice";

import { useEffect } from "react";
import "./App.css";
import Example from "@/components/common/Example";
import Header from "@/components/layout/Header";
import LoginPage from "@/pages/Login/LoginPage";
import MyPage from "@/pages/My/MyPage";
import HomePage from "@/pages/Home/HomePage";
import RegisterPage from "./pages/Register/RegisterPage";
import { setIsOpen } from "./store/uiSlice";
import StudyRegPage from "./pages/StudyReg/StudyRegPage";
import { DatePickerGlobalStyle } from "./components/common/datepicker";
import styled from "styled-components";
import StudyPage from "./pages/Study/StudyPage";
import MyStudiesPage from "./pages/MyStudies/MyStudiesPage";
import MyStudyDashPage from "./pages/MyStudyDash/MyStudyDashPage";
import StudyEditPage from "./pages/StudyEdit/StudyEditPage";
import StorePage from "./pages/Store/StorePage";
import Footer from "./components/layout/Footer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  width: 100%;
`;

const HeaderBlock = styled.div`
  height: 63px;
`;

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const isOpen = useSelector((state) => state.ui.isOpen);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("user");

    if (token && userData && !user) {
      dispatch(login(userData));
    }
  }, [dispatch, user]);

  return (
    <Container
      onClick={() => {
        isOpen && dispatch(setIsOpen(false));
      }}
    >
      <DatePickerGlobalStyle />
      <BrowserRouter>
        <Header user={user} />
        <HeaderBlock />

        <Routes>
          {/* 로그인한 경우 홈으로 */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
            }
          />

          {/* 회원가입 페이지 */}
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />
            }
          />

          {/* 기본 홈 페이지 */}
          <Route path="/" element={<HomePage />} />

          {/* 마이 페이지 */}
          <Route
            path="/my"
            element={isAuthenticated ? <MyPage /> : <Navigate to="/" replace />}
          />

          {/* 나의 스터디 페이지 */}
          <Route
            path="/my/study"
            element={
              isAuthenticated ? <MyStudiesPage /> : <Navigate to="/" replace />
            }
          />

          {/* 나의 스터디 - 대시보드 페이지 */}
          <Route
            path="/my/study/:studyId"
            element={
              isAuthenticated ? (
                <MyStudyDashPage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* 스터디 개설 페이지 */}
          <Route
            path="/studyreg"
            element={
              isAuthenticated ? <StudyRegPage /> : <Navigate to="/" replace />
            }
          />

          {/* 스터디 상세 페이지 */}
          <Route path="/study/:studyId" element={<StudyPage />} />

          {/* 스터디 수정 페이지 */}
          <Route path="/study/edit/:studyId" element={<StudyEditPage />} />

          {/* 상점 페이지 */}
          <Route path="/store" element={<StorePage />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </Container>
  );
}
export default App;
