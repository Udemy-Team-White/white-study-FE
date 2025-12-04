import styled from "styled-components";
import { BodyBold } from "../../styles/fonts";
import { Gray3, Red, StudyLilac } from "../../styles/colors";
import {
  ErrorBoxStyle,
  ErrorMessageStyle,
  InputStyle,
} from "../../components/common/input";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  GrayButtonStyle,
  LilacButtonStyle,
} from "../../components/common/button";
import { useCreateStudy } from "../../api/queries/useCreateStudy";
import { useState } from "react";
import { useGetCategoryList } from "../../api/queries/useGetCategoryList";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import TextEditor from "../../components/common/TextEditor";

const MarginBox = styled.div`
  height: 40px;
`;

const LineBox = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$grid};
  column-gap: 24px;
  width: 100%;
  align-items: center;
  max-width: 800px;
  margin: 0 auto 4px auto;
  padding: 0 24px;
  box-sizing: border-box;
`;

const TitleColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  max-width: 800px;
`;

const TitleRowBox = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 800px;
  align-items: center;
  gap: 8px;
`;

const TitleLabel = styled.div`
  ${BodyBold}
`;

const TitleRequired = styled.span`
  color: ${Red};
`;

const FlexBox = styled.div`
  flex: 1;
`;

const Input = styled.input`
  ${InputStyle}
  width: 100%;
`;

const StudyTypeInput = styled.input`
  accent-color: ${StudyLilac};
`;

const StudyTypeBox = styled.div`
  display: flex;
  gap: 20px;
  padding-top: 22px;
  justify-content: ${(props) => props.$justify};
`;

const StyledDatePickerWrapper = styled.div`
  & {
    width: 100%;
  }
  input {
    ${InputStyle}
    width: 100%;
    padding: 8px 12px;
    font-size: 0.9rem;
    border: 1px solid ${Gray3};
    box-sizing: border-box;
  }
`;

const CategoryInputBox = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$grid};
  gap: 24px;
  width: 100%;
  align-items: center;
  max-width: 800px;
  box-sizing: border-box;
`;

const SelectCategory = styled.select`
  ${InputStyle}
`;

const CategoryTagBox = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 8px 0;
`;

const CategoryTag = styled.div`
  background-color: ${StudyLilac};
  color: white;
  padding: 0 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.85rem;
  padding: 0;
`;

const LilacButton = styled.button`
  ${LilacButtonStyle}
`;

const CancleButton = styled.button`
  ${GrayButtonStyle}
`;

const ErrorBox = styled.div`
  ${ErrorBoxStyle}
  display: grid;
  grid-template-columns: ${(props) => props.$grid};
  gap: 24px;
`;

const ErrorMessage = styled.div`
  ${ErrorMessageStyle}
  position: relative;
`;

const StudyRegPage = () => {
  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      studyType: "ONLINE",
      maxMembers: "",
      closedAt: null,
      startDate: null,
      endDate: null,
    },
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const { mutate: createStudy, isLoading } = useCreateStudy();

  const { categoryList } = useGetCategoryList();

  const isDesktop = useMediaQuery({ minWidth: 767 });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != null && v !== ""),
    );

    const categoryIds = categories
      .map((catName) => categoryList.find((c) => c.name === catName)?.id)
      .filter((id) => id !== undefined && id !== null);

    const payload = {
      ...filteredData,
      categoryIds,
    };

    createStudy(payload);
  };

  const handleAddCategory = () => {
    if (!selectedCategory) return;
    if (selectedCategory && !categories.includes(selectedCategory)) {
      setCategories((prev) => [...prev, selectedCategory]);
    }
  };

  const handleCancle = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MarginBox />
      <LineBox $grid={isDesktop ? "1fr 1fr" : "repeat(1, 2fr)"}>
        <TitleColumnBox>
          <TitleLabel>스터디 이름</TitleLabel>
          <Input
            {...register("studyName", {
              maxLength: { value: 50, message: "50자 이하로 입력해주세요." },
            })}
          />
        </TitleColumnBox>
        <StudyTypeBox $justify={isDesktop ? "flex-end" : "space-between"}>
          <div>
            <StudyTypeInput
              type="radio"
              value="ONLINE"
              id="online"
              {...register("studyType")}
            />
            <label htmlFor="online"> 온라인</label>
          </div>
          <div>
            <StudyTypeInput
              type="radio"
              value="OFFLINE"
              id="offline"
              {...register("studyType")}
            />
            <label htmlFor="offline"> 오프라인</label>
          </div>
          <div>
            <StudyTypeInput
              type="radio"
              value="MIXED"
              id="mixed"
              {...register("studyType")}
            />
            <label htmlFor="mixed"> 온·오프라인</label>
          </div>
        </StudyTypeBox>
      </LineBox>
      <ErrorBox>
        <ErrorMessage></ErrorMessage>
      </ErrorBox>

      <LineBox>
        <TitleRowBox>
          <TitleLabel>
            모집글 제목<TitleRequired> *</TitleRequired>
          </TitleLabel>
          <FlexBox>
            <Input
              {...register("title", {
                required: "모집글 제목은 필수입니다.",
                maxLength: {
                  value: 100,
                  message: "100자 이하로 입력해주세요.",
                },
              })}
            />
          </FlexBox>
        </TitleRowBox>
      </LineBox>
      <LineBox>
        <ErrorBox>
          <ErrorMessage>{errors?.title && errors?.title.message}</ErrorMessage>
        </ErrorBox>
      </LineBox>

      <LineBox>
        <Controller
          name="content"
          control={control}
          rules={{ required: "내용은 필수입니다." }}
          render={({ field }) => (
            <TextEditor value={field.value} onChange={field.onChange} />
          )}
        />
      </LineBox>
      <LineBox>
        <ErrorMessage>
          {errors?.content && errors?.content.message}
        </ErrorMessage>
      </LineBox>

      <LineBox $grid={isDesktop ? "1fr 1fr 1fr 1fr" : "repeat(2, 2fr)"}>
        <TitleColumnBox>
          <TitleLabel>
            모집 마감일<TitleRequired> *</TitleRequired>
          </TitleLabel>
          <Controller
            control={control}
            name="closedAt"
            rules={{ required: "모집 마감일은 필수입니다." }}
            render={({ field }) => (
              <StyledDatePickerWrapper>
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  withPortal
                  placeholderText="모집 마감일"
                  dateFormat="yyyy.MM.dd"
                  minDate={new Date()}
                />
              </StyledDatePickerWrapper>
            )}
          />
          <ErrorBox>
            <ErrorMessage>
              {errors?.closedAt && errors?.closedAt.message}
            </ErrorMessage>
          </ErrorBox>
        </TitleColumnBox>

        <TitleColumnBox>
          <TitleLabel>
            모집 인원<TitleRequired> *</TitleRequired>
          </TitleLabel>
          <Input
            type="number"
            min={1}
            {...register("maxMembers", {
              required: "모집 인원은 필수입니다.",
              min: { value: 2, message: "2명 이상 입력해주세요." },
            })}
          />
          <ErrorBox>
            <ErrorMessage>
              {errors?.maxMembers && errors?.maxMembers.message}
            </ErrorMessage>
          </ErrorBox>
        </TitleColumnBox>

        <TitleColumnBox>
          <TitleLabel>스터디 기간</TitleLabel>
          <Controller
            control={control}
            name="startDate"
            rules={{
              validate: (value) => {
                const end = getValues("endDate");
                if (value && end && value > end) {
                  return "시작일은 종료일보다 빠르거나 같아야 합니다.";
                }
                return true;
              },
            }}
            render={({ field }) => (
              <StyledDatePickerWrapper>
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  selectsStart
                  startDate={field.value}
                  endDate={getValues("endDate")}
                  placeholderText="스터디 시작일"
                  withPortal
                  dateFormat="yyyy.MM.dd"
                  minDate={new Date()}
                />
              </StyledDatePickerWrapper>
            )}
          />
          <ErrorBox>
            <ErrorMessage></ErrorMessage>
          </ErrorBox>
        </TitleColumnBox>

        <TitleColumnBox>
          <TitleLabel>　</TitleLabel>
          <Controller
            control={control}
            name="endDate"
            rules={{
              validate: (value) => {
                const start = getValues("startDate");
                if (value && start && value < start) {
                  return "종료일은 시작일보다 빠를 수 없습니다.";
                }
                return true;
              },
            }}
            render={({ field }) => (
              <StyledDatePickerWrapper>
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  selectsEnd
                  startDate={getValues("startDate")}
                  endDate={field.value}
                  minDate={getValues("startDate")}
                  placeholderText="스터디 종료일"
                  withPortal
                  dateFormat="yyyy.MM.dd"
                />
              </StyledDatePickerWrapper>
            )}
          />
          <ErrorBox>
            <ErrorMessage></ErrorMessage>
          </ErrorBox>
        </TitleColumnBox>
      </LineBox>

      <LineBox>
        <TitleColumnBox>
          <TitleLabel>스터디 카테고리</TitleLabel>
          <CategoryInputBox $grid={isDesktop ? "7fr 1fr" : "6fr 2fr"}>
            <SelectCategory
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">선택하기</option>
              {categoryList?.map((ele) => (
                <option key={"category" + ele.id} value={ele.name}>
                  {ele.name}
                </option>
              ))}
            </SelectCategory>
            <LilacButton type="button" onClick={handleAddCategory}>
              입력
            </LilacButton>
          </CategoryInputBox>
        </TitleColumnBox>
      </LineBox>

      <LineBox>
        <CategoryTagBox>
          {categories.map((cat) => (
            <CategoryTag key={cat}>
              {cat}
              <RemoveButton
                onClick={() =>
                  setCategories(categories.filter((c) => c !== cat))
                }
              >
                ×
              </RemoveButton>
            </CategoryTag>
          ))}
        </CategoryTagBox>
      </LineBox>

      <LineBox $grid={isDesktop ? "4fr 2fr 2fr" : "1fr 1fr"}>
        {isDesktop && <div></div>}
        <CancleButton type="button" onClick={handleCancle}>
          취소하기
        </CancleButton>
        <LilacButton type="submit">스터디 개설</LilacButton>
      </LineBox>
    </form>
  );
};

export default StudyRegPage;
