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

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("user");

    if (token && userData && !user) {
      dispatch(login(userData));
    }
  }, [dispatch, user]);

  return (
    <BrowserRouter>
      <Header user={user} />

      <Routes>
        {/* 로그인한 경우 홈으로 */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
          }
        />

        {/* 기본 홈 페이지 */}
        <Route path="/" element={<HomePage />} />

        {/* 마이 페이지 */}
        <Route
          path="/my"
          element={isAuthenticated ? <MyPage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
