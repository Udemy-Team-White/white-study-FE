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
  margin-bottom: 40px;
`;

const StudyContainer = styled.div`
  max-width: 1080px;
  width: 100%;
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

  const { studiesData } = useGetStudies({
    page: currentPage - 1,
    size: 8,
    sortBy: "latest",
    keyword: keyword,
    category: "",
  });

  const totalPages = studiesData?.pageInfo?.totalPages;

  return (
    <Container>
      <HomeCarousel />
      <Searchbar setKeyword={setKeyword} setCurrentPage={setCurrentPage} />
      <StudyContainer>
        {studiesData?.studies.map((data, index) => (
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
    </Container>
  );
};

export default HomePage;
