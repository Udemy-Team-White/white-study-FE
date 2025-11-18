import { useNavigate } from "react-router-dom";
import { useAuth } from "../../api/hooks/useAuth";
import Pagination from "../../components/common/Pagination";
import { useState } from "react";
import StudyBox from "./components/StudyBox";
import styled from "styled-components";
import HomeCarousel from "./components/HomeCarousel";
import { useGetStudies } from "../../api/queries/useGetStudies";
import Searchbar from "./components/Searchbar";

const Container = styled.div`
  display: flex;
  gap: 48px;
  flex-direction: column;
`;

const HeaderBlock = styled.div`
  height: 15px;
`;

const StudyContainer = styled.div`
  max-width: 1080px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;

  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 24px;
`;

const HomePage = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);

  const [keyword, setKeyword] = useState("");

  const { StudiesData } = useGetStudies({
    page: currentPage - 1,
    size: 8,
    keyword: keyword,
    sortBy: "latest",
  });

  const totalPages = StudiesData?.pageInfo?.totalPages;

  return (
    <Container>
      <HeaderBlock />
      <HomeCarousel />
      <Searchbar setKeyword={setKeyword} setCurrentPage={setCurrentPage} />
      <StudyContainer>
        {StudiesData?.studies.map((data, index) => (
          <StudyBox key={"study" + index} data={data} />
        ))}
      </StudyContainer>
      <PaginationContainer>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages || 1}
          onPageChange={setCurrentPage}
        />
      </PaginationContainer>

      <div onClick={handleLogout}>로그아웃</div>
      <div onClick={() => navigate("/register")}>회원가입</div>
      <div onClick={() => navigate("/login")}>로그인 페이지</div>
      <div onClick={() => navigate("/my")}>마이 페이지</div>
    </Container>
  );
};

export default HomePage;
