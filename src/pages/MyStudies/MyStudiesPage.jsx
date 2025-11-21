import styled from "styled-components";
import MyStudiesBox from "./components/MyStudiesBox";
import Pagination from "../../components/common/Pagination";
import { useState } from "react";
import { useGetMyStudies } from "../../api/queries/useGetMyStudies";

const myStudiesData = {
  studies: [
    {
      studyId: 1,
      title: "string (스터디 제목)string (스터디 제목)string (스터디 제목)",
      studyType: "ONLINE",
      studyStatus: "RECRUITING",
      categories: ["FE", "자바스크립트"],
      currentMembers: 3,
      maxMembers: 5,
      myRole: "MEMBER",
    },
  ],
  pageInfo: {
    page: 1,
    size: 8,
    totalPages: 2,
    totalElements: 48,
  },
};

const Container = styled.div`
  display: flex;
  gap: 48px;
  flex-direction: column;
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

const MyStudiesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { myStudiesData } = useGetMyStudies({
    status: "IN_PROGRESS",
    page: currentPage - 1,
    size: 8,
  });

  const totalPages = myStudiesData?.pageInfo?.totalPages;

  return (
    <Container>
      <StudyContainer>
        {myStudiesData?.studies?.map((data, index) => (
          <MyStudiesBox key={"myStudy" + index} data={data} />
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

export default MyStudiesPage;
