import styled from "styled-components";
import { Lilac0, White } from "../../../styles/colors";
import { LilacButtonStyle } from "../../../components/common/button";
import { useMediaQuery } from "react-responsive";
import { useGetReports } from "../../../api/queries/useGetReports";
import { Body, BodyBold } from "../../../styles/fonts";
import { formatDate } from "../../../utils/formatDate";
import { useState } from "react";
import Pagination from "../../../components/common/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsModalOpen } from "../../../store/modalSlice";
import Modal from "../../../components/common/Modal";
import ReportDetail from "./component/ReportDetail";

const reportsData = {
  reports: [
    {
      reportId: 0,
      authorUsername: "string (작성자 닉네임)",
      contentSnippet: "string (내용 100자 요약)",
      createdAt: new Date("2024-12-11"),
    },
    {
      reportId: 1,
      authorUsername: "string (작성자 닉네임)",
      contentSnippet: "string (내용 100자 요약)",
      createdAt: new Date("2024-12-11"),
    },
  ],
  pageInfo: {
    page: 1,
    size: 1,
    totalPages: 1,
    totalElements: 2,
  },
};

const Container = styled.div`
  background-color: ${Lilac0};
  max-width: 1080px;
  margin: auto;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const GridLine = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 12px;
  width: 100%;
  @media (min-width: 767px) {
    grid-template-columns: 3fr 1fr;
  }
`;

const Button = styled.button`
  ${LilacButtonStyle}
`;

const ReportBox = styled.div`
  background-color: ${White};
  border-radius: 16px;
  padding: 20px 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;

  cursor: pointer;
`;

const ReportTitle = styled.div`
  ${BodyBold}
  cursor: pointer;
`;

const ReportDate = styled.div`
  ${Body}
  cursor: pointer;
`;

const Report = ({ studyId, setActiveTab }) => {
  const isDesktop = useMediaQuery({ minWidth: 767 });

  const { reportsData } = useGetReports(studyId);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = reportsData?.pageInfo?.totalPages;

  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modalUi.isModalOpen);

  const [selectedReportId, setSelectedReportId] = useState(null);

  const openModal = (reportId) => {
    dispatch(toggleIsModalOpen());
    setSelectedReportId(reportId);
  };

  return (
    <>
      {isModalOpen && (
        <Modal bgColor={White} maxWidth={"900px"} reportId={selectedReportId}>
          <ReportDetail reportId={selectedReportId} />
        </Modal>
      )}

      <Container>
        <GridLine>
          {isDesktop && <div></div>}

          <Button type="button" onClick={() => setActiveTab(6)}>
            보고서 작성하기
          </Button>
        </GridLine>

        {reportsData?.reports?.map((report) => (
          <ReportBox
            key={report.reportId}
            onClick={() => openModal(report.reportId)}
          >
            <ReportTitle>{report?.contentSnippet}</ReportTitle>
            <ReportDate>{formatDate(report?.createdAt)}</ReportDate>
          </ReportBox>
        ))}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages || 1}
          onPageChange={setCurrentPage}
        />
      </Container>
    </>
  );
};

export default Report;
