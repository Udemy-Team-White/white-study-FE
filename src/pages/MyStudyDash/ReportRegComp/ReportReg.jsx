import styled from "styled-components";
import { Lilac0 } from "../../../styles/colors";
import TextEditor from "../../../components/common/TextEditor";
import {
  ErrorBoxStyle,
  ErrorMessageStyle,
  InputStyle,
} from "../../../components/common/input";
import { Controller, useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import {
  GrayButtonStyle,
  LilacButtonStyle,
} from "../../../components/common/button";
import { BodyBold } from "../../../styles/fonts";
import { useCreateReport } from "../../../api/queries/useCreateReport";

const Container = styled.div`
  background-color: ${Lilac0};
  max-width: 1080px;
  margin: auto;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const TitleLabel = styled.div`
  ${BodyBold}
`;

const TitleInput = styled.input`
  ${InputStyle}
`;

const Textarea = styled.textarea`
  ${InputStyle}
  resize: none;
  height: 76px;
`;

const GridLine = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @media (min-width: 767px) {
    grid-template-columns: 6fr 1fr 1fr;
  }
`;

const CancleButton = styled.button`
  ${GrayButtonStyle}
`;

const SubmitButton = styled.button`
  ${LilacButtonStyle}
`;

const ErrorBox = styled.div`
  ${ErrorBoxStyle}
`;

const ErrorMessage = styled.div`
  ${ErrorMessageStyle}
`;

const ReportReg = ({ studyId, setActiveTab }) => {
  const isDesktop = useMediaQuery({ minWidth: 767 });

  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: "",
      summary: "",
      content: "",
    },
  });

  const { mutate } = useCreateReport();

  const onSubmit = (data) => {
    mutate(
      { studyId, data },
      {
        onSuccess: () => {
          setActiveTab(2);
        },
      },
    );
  };

  const handleCancle = () => {
    setActiveTab(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <TitleLabel>제목</TitleLabel>
        <TitleInput
          {...register("subject", { required: "제목은 필수입니다." })}
        />
        <ErrorBox>
          <ErrorMessage>
            {errors?.subject && errors?.subject.message}
          </ErrorMessage>
        </ErrorBox>

        <TitleLabel>한 줄 요약</TitleLabel>
        <Textarea {...register("summary")} />
        <ErrorBox>
          <ErrorMessage>
            {errors?.summary && errors?.summary.message}
          </ErrorMessage>
        </ErrorBox>

        <TitleLabel>본문</TitleLabel>
        <Controller
          name="content"
          control={control}
          rules={{ required: "내용은 필수입니다." }}
          render={({ field }) => (
            <TextEditor value={field.value} onChange={field.onChange} />
          )}
        />
        <ErrorBox>
          <ErrorMessage>
            {errors?.content && errors?.content.message}
          </ErrorMessage>
        </ErrorBox>

        <GridLine>
          {isDesktop && <div></div>}
          <CancleButton type="button" onClick={handleCancle}>
            취소하기
          </CancleButton>
          <SubmitButton type="submit">작성하기</SubmitButton>
        </GridLine>
      </Container>
    </form>
  );
};

export default ReportReg;
