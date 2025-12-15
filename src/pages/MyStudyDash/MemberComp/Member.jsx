import styled from "styled-components";
import { Lilac0, StudyLilac, White } from "../../../styles/colors";
import { Heading5Bold } from "../../../styles/fonts";
import { RedButtonStyle } from "../../../components/common/button";
import { useDeleteMember } from "../../../api/queries/useDeleteMember";
import { useGetMemberList } from "../../../api/queries/useGetMemberList";

const Container = styled.div`
  max-width: 1080px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;

  margin: auto;
  padding: 24px;
  background-color: ${Lilac0};
  box-sizing: border-box;
`;

const MemberBox = styled.div`
  flex: 1 1 100%;
  box-sizing: border-box;

  display: flex;
  max-width: 100%;
  background-color: ${White};
  border-radius: 20px;

  @media (min-width: 767px) {
    flex: 1 1 calc(50% - 24px);
    max-width: calc(50% - 12px);
  }
`;

const ImgBox = styled.img`
  width: 115px;
  height: 115px;
  margin: 16px;
  background-color: ${StudyLilac};
  border-radius: 12px;
  flex-shrink: 0;
  object-fit: cover;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

const Nickname = styled.div`
  ${Heading5Bold}
  margin: 16px 20px 0 0;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const RedButton = styled.button`
  ${RedButtonStyle}
  border-radius: 20px 0 20px 0;
  padding: 0 16px;
`;

const Member = ({ studyId, isLeader }) => {
  const { mutate } = useDeleteMember();

  const { memberListData } = useGetMemberList({ studyId });

  const onClicked = (memberId) => {
    mutate({ studyId, memberId });
  };

  return (
    <Container>
      {memberListData?.members?.map((data, index) => (
        <MemberBox key={"member" + index}>
          {data?.user?.imgUrl ? (
            <ImgBox src={data?.user?.imgUrl} />
          ) : (
            <ImgBox />
          )}
          <NameBox>
            <div>
              <Nickname>{data?.user?.username}</Nickname>
              {data?.role}
            </div>
            {data?.role !== "LEADER" && isLeader && (
              <ButtonBox>
                <RedButton onClick={() => onClicked(data?.memberId)}>
                  강퇴하기
                </RedButton>
              </ButtonBox>
            )}
          </NameBox>
        </MemberBox>
      ))}
    </Container>
  );
};

export default Member;
