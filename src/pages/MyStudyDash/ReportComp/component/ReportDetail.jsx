import styled from "styled-components";
import { Heading5Bold } from "../../../../styles/fonts";
import { useGetReport } from "../../../../api/queries/useGetReport";
import { Lilac0, StudyLilac } from "../../../../styles/colors";
import { FaRegLightbulb } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  GrayButtonStyle,
  LilacButtonStyle,
} from "../../../../components/common/button";
import { setIsModalOpen } from "../../../../store/modalSlice";

const reportData = {
  subject: "제목!",
  summary: "한 줄 요약!",
  content: "<p>내용이에요.</p>",
};

const Title = styled.div`
  ${Heading5Bold}
  border-bottom: 1px solid ${StudyLilac};
  padding-bottom: 20px;
`;

const SummaryBox = styled.div`
  background-color: ${Lilac0};
  margin: 24px 0;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
`;

const LightIcon = styled(FaRegLightbulb)`
  height: 24px;
  color: ${StudyLilac};
  margin-right: 16px;
  flex-shrink: 0;
`;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (min-width: 767px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const CancleButton = styled.button`
  ${GrayButtonStyle}
`;

const EditButton = styled.button`
  ${LilacButtonStyle}
`;

const ReportDetail = ({ reportId }) => {
  const { reportData } = useGetReport(reportId);

  const dispatch = useDispatch();

  const isDesktop = useMediaQuery({ minWidth: 767 });

  return (
    <>
      <Title>{reportData?.subject}</Title>
      <SummaryBox>
        <LightIcon />
        {reportData?.summary}
      </SummaryBox>
      <div dangerouslySetInnerHTML={{ __html: reportData?.content }} />
      <GridBox>
        {isDesktop && <div />}
        <EditButton>수정</EditButton>
        <CancleButton onClick={() => dispatch(setIsModalOpen(false))}>
          닫기
        </CancleButton>
      </GridBox>
    </>
  );
};

export default ReportDetail;
