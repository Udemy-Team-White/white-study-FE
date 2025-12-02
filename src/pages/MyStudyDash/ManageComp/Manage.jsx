import styled from "styled-components";
import { Lilac0, StudyLilac, White } from "../../../styles/colors";
import { useGetApplicants } from "../../../api/queries/useGetApplicants";
import { Heading5Bold } from "../../../styles/fonts";
import {
  GrayButtonStyle,
  LilacButtonStyle,
} from "../../../components/common/button";
import { useApplicantsApprove } from "../../../api/queries/useApplicantsApprove";
import { useApplicantsReject } from "../../../api/queries/useApplicantsReject";

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

const ApplicantBox = styled.div`
  width: 100%;
  background-color: ${White};
  box-sizing: border-box;
  padding: 16px;
  border-radius: 20px;
`;

const ProfileBox = styled.div`
  min-height: 100px;
  margin-bottom: 12px;
`;

const ImgBox = styled.img`
  background-color: ${StudyLilac};
  width: 100px;
  height: 100px;
  float: left;
  margin-right: 12px;
  border-radius: 12px;
`;

const Nickname = styled.div`
  ${Heading5Bold}
  word-break: break-all;
  overflow-wrap: break-word;
`;

const Text = styled.span`
  word-break: break-all;
  overflow-wrap: break-word;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
`;

const RejectButton = styled.button`
  ${GrayButtonStyle}
  flex: 1;
`;

const ApproveButton = styled.button`
  ${LilacButtonStyle}
  flex: 1;
`;

const Manage = ({ studyId }) => {
  const { applicantsList } = useGetApplicants(studyId);

  const { mutate: approveMutate } = useApplicantsApprove();
  const { mutate: rejectMutate } = useApplicantsReject();

  const onClickApprove = (applicationId) => {
    approveMutate({ studyId, applicationId });
  };

  const onClickReject = (applicationId) => {
    rejectMutate({ studyId, applicationId });
  };

  return (
    <Container>
      {applicantsList?.map((applicant) => (
        <ApplicantBox>
          <ProfileBox>
            <ImgBox />
            <Nickname>{applicant?.user?.username}</Nickname>
            <Text>{applicant?.message}</Text>
          </ProfileBox>
          <ButtonBox>
            <RejectButton
              onClick={() => onClickReject(applicant.applicationId)}
            >
              거절하기
            </RejectButton>
            <ApproveButton
              onClick={() => onClickApprove(applicant.applicationId)}
            >
              승인하기
            </ApproveButton>
          </ButtonBox>
        </ApplicantBox>
      ))}
    </Container>
  );
};

export default Manage;
