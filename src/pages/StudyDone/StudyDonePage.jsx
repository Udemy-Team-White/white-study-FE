import styled from "styled-components";
import { useGetMemberList } from "../../api/queries/useGetMemberList";
import { useParams } from "react-router-dom";
import { Black, Lilac0, StudyLilac, White } from "../../styles/colors";
import { Heading5Bold } from "../../styles/fonts";
import { useState } from "react";
import {
  LilacButtonStyle,
  PraiseBoxStyle,
} from "../../components/common/button";
import { useForm } from "react-hook-form";
import { usePostPraise } from "../../api/queries/usePostPraise";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 40px;
  width: 100%;

  margin-bottom: 40px;
`;

const MemberContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;

  margin: auto;
  padding: 24px;
  background-color: ${White};
  box-sizing: border-box;
`;

const MemberBox = styled.div`
  flex: 1 1 100%;
  box-sizing: border-box;

  display: flex;
  max-width: 100%;
  border-radius: 16px;
  color: ${(props) => (props.$active ? White : Black)};
  background-color: ${(props) => (props.$active ? StudyLilac : Lilac0)};
  transition:
    background-color 0.2s,
    color 0.2s;

  @media (min-width: 767px) {
    flex: 1 1 calc(50% - 24px);
    max-width: calc(50% - 12px);
  }
`;

const ImgBox = styled.img`
  width: 80px;
  height: 80px;
  margin: 16px;
  background-color: ${StudyLilac};
  border-radius: 8px;
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

const PraiseContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 24px;
  box-sizing: border-box;
`;

const PraiseBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const PraiseList = styled.div`
  ${PraiseBoxStyle}
  background-color: ${(props) => (props.$active ? StudyLilac : White)};
  box-shadow: ${(props) =>
    props.$active ? "none" : `inset 0 0 0 1px ${StudyLilac}`};
  color: ${(props) => (props.$active ? White : StudyLilac)};
  transition:
    background-color 0.2s,
    color 0.2s,
    box-shadow 0.2s;
  box-sizing: border-box;
`;

const ButtonBox = styled.div`
  display: flex;
  padding: 24px;
  box-sizing: border-box;
`;

const Button = styled.button`
  ${LilacButtonStyle}
  width: 100%;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const StudyDonePage = () => {
  const { studyId } = useParams();

  const { memberListData } = useGetMemberList({ studyId });

  const { mutateAsync: mutatePraise } = usePostPraise();

  const { register, handleSubmit } = useForm();

  const [selectedRadio, setSelectedRadio] = useState(null);
  const [checkedIds, setCheckedIds] = useState([]);

  console.log(selectedRadio, checkedIds);

  const toggleCheckbox = (value) => {
    setCheckedIds((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const onSubmit = async () => {
    const requestBodies = checkedIds.map((msg) => ({
      receiverId: Number(selectedRadio),
      message: msg,
    }));

    try {
      for (const body of requestBodies) {
        await mutatePraise({ studyId, body });
      }

      alert("칭찬 완료!");
    } catch (err) {
      alert(err.response?.data?.message || "칭찬 실패!");
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MemberContainer>
          {memberListData?.members?.map((data) => {
            const id = data?.user?.userId;
            const isActive = selectedRadio === String(id);

            return (
              <MemberBox
                key={id}
                $active={isActive}
                onClick={() => setSelectedRadio(String(id))}
              >
                <HiddenInput
                  type="radio"
                  value={id}
                  {...register("receiverId", {
                    required: true,
                    onChange: (e) => setSelectedRadio(e.target.value),
                  })}
                  checked={selectedRadio === String(id)}
                />

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
                </NameBox>
              </MemberBox>
            );
          })}
        </MemberContainer>
        <PraiseContainer>
          {[
            "성실해요",
            "정리를 잘 해요",
            "다른 사람을 잘 도와줘요",
            "전공 지식이 풍부해요",
          ].map((label, index) => (
            <PraiseBox
              key={"praise" + index}
              onClick={() => toggleCheckbox(label)}
            >
              <HiddenInput
                type="checkbox"
                value={label}
                checked={checkedIds.includes(label)}
                readOnly
              />

              <PraiseList $active={checkedIds.includes(label)}>
                {label}
              </PraiseList>
            </PraiseBox>
          ))}
        </PraiseContainer>
        <ButtonBox>
          <Button type="submit">칭찬하기</Button>
        </ButtonBox>
      </form>
    </Container>
  );
};

export default StudyDonePage;
