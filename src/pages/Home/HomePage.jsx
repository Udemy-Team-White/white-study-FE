import { useNavigate } from "react-router-dom";
import { useAuth } from "../../api/hooks/useAuth";
import Pagination from "../../components/common/Pagination";
import { useState } from "react";
import StudyBox from "./components/StudyBox";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

const HomePage = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 13;

  return (
    <>
      <div onClick={handleLogout}>로그아웃</div>
      <div onClick={() => navigate("/register")}>회원가입</div>
      <div onClick={() => navigate("/login")}>로그인 페이지</div>
      <div onClick={() => navigate("/my")}>마이 페이지</div>
      <Container>
        <StudyBox />
        <StudyBox />
        <StudyBox />
      </Container>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default HomePage;
