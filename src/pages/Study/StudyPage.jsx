import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  CornerTagStyle,
  GrayButtonStyle,
  LilacButtonStyle,
  TagBoxStyle,
  TagStyle,
} from "../../components/common/button";
import { filterStudyType } from "../../utils/filterStudyType";
import { BodyBold, Heading5Bold } from "../../styles/fonts";
import { Gray3, Lilac0 } from "../../styles/colors";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpen, toggleIsModalOpen } from "../../store/modalSlice";
import Modal from "../../components/common/Modal";
import {
  ErrorBoxStyle,
  ErrorMessageStyle,
  InputStyle,
} from "../../components/common/input";
import { useGetStudy } from "../../api/queries/useGetStudy";
import { useForm } from "react-hook-form";
import { useApplyStudy } from "../../api/queries/useApplyStudy";
import { formatDate } from "../../utils/formatDate";

const data = {
  studyInfo: {
    studyId: "integer (조회한 스터디 ID)",
    title: "string (스터디 제목)",
    content: "<p>내용</p>",
    studyType: "ONLINE",
    status: "string (현재 스터디 상태, 예: 'RECRUITING', 'RECRUITMENT_CLOSED')",
    currentMembers: "integer (현재 확정 멤버 수)",
    maxMembers: "integer (총 모집 인원)",
    closedAt: "string (DATETIME, 모집 마감일)",
    startDate: "string (DATETIME, 스터디 시작일)",
    endDate: "string (DATETIME, 스터디 시작일)",
  },
  categories: [
    {
      categoryId: "integer",
      name: "string (카테고리 이름, 예: 'FE')",
    },
    {
      categoryId: "integer",
      name: "string (예: 'React')",
    },
    {
      categoryId: "integer",
      name: "string (카테고리 이름, 예: 'FE')",
    },
    {
      categoryId: "integer",
      name: "string (예: 'React')",
    },
    {
      categoryId: "integer",
      name: "string (카테고리 이름, 예: 'FE')",
    },
    {
      categoryId: "integer",
      name: "string (예: 'React')",
    },
  ],
  studyLeader: {
    username: "string (스터디장 닉네임)",
    reliabilityScore: "integer (스터디장 신뢰도 점수)",
  },
  userStatus: "string (이 스터디에 대한 *현재 접속자*의 상태)",
};

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 0 24px;
  box-sizing: border-box;
`;

const TitleBox = styled.div`
  border-bottom: 1px solid ${Gray3};
`;

const OnlineTag = styled.span`
  ${CornerTagStyle}
`;

const Title = styled.div`
  ${Heading5Bold}
  margin: 16px 0 20px 0;
`;

const ContentBox = styled.div`
  border-bottom: 1px solid ${Gray3};
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MemberRestBox = styled.div`
  background-color: ${Lilac0};
  border-radius: 16px;
  padding: 24px;
  ${BodyBold}
`;

const CategoryTagBox = styled.div`
  ${TagBoxStyle}
  margin-bottom: 16px;
`;

const CategoryTag = styled.div`
  ${TagStyle}
`;

const BottomBox = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$grid};
  gap: 24px;
  & > :nth-child(3) {
    grid-column: 1 / -1;
  }
  @media (min-width: 767px) {
    & > :nth-child(3) {
      grid-column: unset;
    }
  }
`;

const TextLabel = styled.div`
  ${BodyBold}
`;

const Textarea = styled.textarea`
  ${InputStyle}
  width: 100%;
  height: 200px;
  resize: none;
`;

const ErrorBox = styled.div`
  ${ErrorBoxStyle}
`;

const ErrorMessage = styled.div`
  ${ErrorMessageStyle}
`;

const CancleButton = styled.button`
  ${GrayButtonStyle}
`;

const Button = styled.button`
  ${LilacButtonStyle}
`;

const StudyPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { studyId } = useParams();

  const { mutate: applyStudy, isLoading } = useApplyStudy();

  const { studyData } = useGetStudy(studyId);

  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modalUi.isModalOpen);

  const isDesktop = useMediaQuery({ minWidth: 767 });

  const restMember =
    studyData?.studyInfo?.maxMembers - studyData?.studyInfo?.currentMembers;
  const startDate = studyData?.studyInfo?.startDate;
  const endDate = studyData?.studyInfo?.endDate;

  const onSubmit = (message) => {
    applyStudy(studyId, message);
    dispatch(setIsModalOpen(false));
  };

  return (
    <>
      {isModalOpen && (
        <Modal>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              {...register("message", { required: "메세지를 작성해주세요." })}
            />
            <ErrorBox>
              <ErrorMessage>
                {errors?.message && errors?.message.message}
              </ErrorMessage>
            </ErrorBox>
            <BottomBox $grid="1fr 1fr">
              <CancleButton
                type="button"
                onClick={() => dispatch(setIsModalOpen(false))}
              >
                취소하기
              </CancleButton>
              <Button type="submit">신청하기</Button>
            </BottomBox>
          </form>
        </Modal>
      )}
      <Container>
        <TitleBox>
          <OnlineTag>
            {filterStudyType(studyData?.studyInfo?.studyType)}
          </OnlineTag>
          <Title>{studyData?.studyInfo?.title}</Title>
        </TitleBox>
        <ContentBox>
          <div>
            <MemberRestBox>
              {restMember && restMember != 0
                ? restMember + "자리 남았어요."
                : "자리가 없어요!"}
            </MemberRestBox>
            <div
              dangerouslySetInnerHTML={{
                __html: studyData?.studyInfo?.content,
              }}
            />
          </div>
          <CategoryTagBox>
            {studyData?.categories?.map((category) => (
              <CategoryTag key={"category" + category?.categoryId}>
                {category?.name}
              </CategoryTag>
            ))}
          </CategoryTagBox>
        </ContentBox>

        <BottomBox $grid={isDesktop ? "1fr 1fr 2fr" : "1fr 1fr"}>
          <div>
            <TextLabel>모집 기간</TextLabel>
            <div>{formatDate(studyData?.studyInfo?.closedAt)}</div>
          </div>
          <div>
            <TextLabel>모집 인원</TextLabel>
            <div>{studyData?.studyInfo?.maxMembers} 명</div>
          </div>
          <div>
            <TextLabel>스터디 기간</TextLabel>
            <div>
              {!startDate && !endDate
                ? "미정"
                : (formatDate(startDate) || "미정") +
                  " ~ " +
                  (formatDate(endDate) || "미정")}
            </div>
          </div>
        </BottomBox>

        <BottomBox $grid={isDesktop ? "3fr 1fr" : "1fr"}>
          {isDesktop && <div />}
          <ButtonType userType={studyData?.userStatus} />
        </BottomBox>
      </Container>
    </>
  );
};

export default StudyPage;

const ButtonType = ({ userType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLeader = () => {};
  const handleMember = () => {};
  const handleNone = () => {
    dispatch(toggleIsModalOpen());
  };
  const handleGuest = () => {
    // navigate("/login");
    dispatch(toggleIsModalOpen());
  };

  if (userType === "LEADER")
    return <Button onClick={handleLeader}>스터디 관리하기</Button>;

  if (userType === "MEMBER")
    return <Button onClick={handleMember}>스터디 하러가기</Button>;

  if (userType === "APPLIED") return <Button disabled>승인 대기 중</Button>;

  if (userType === "NONE")
    return <Button onClick={handleNone}>스터디 신청하기</Button>;

  return <Button onClick={handleGuest}>로그인 후 신청하기</Button>;
};
