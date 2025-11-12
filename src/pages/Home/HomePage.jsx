import { useNavigate } from "react-router-dom";
import { useAuth } from "../../api/hooks/useAuth";

const HomePage = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  return (
    <>
      <div onClick={handleLogout}>로그아웃</div>
      <div onClick={() => navigate("/register")}>회원가입</div>
      <div onClick={() => navigate("/login")}>로그인 페이지</div>
      <div onClick={() => navigate("/my")}>마이 페이지</div>
    </>
  );
};

export default HomePage;
