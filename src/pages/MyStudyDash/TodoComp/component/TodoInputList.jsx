import { useState } from "react";
import styled from "styled-components";
import { Lilac1, Lilac2, StudyLilac, White } from "../../../../styles/colors";
import { Body, Heading4Bold } from "../../../../styles/fonts";
import { useCreateTodo } from "../../../../api/queries/useCreateTodo";

const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputBox = styled.div`
  width: 100%;
  min-height: 60px;
  background-color: ${White};
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 16px 20px;
  box-sizing: border-box;
  border: 1px solid ${Lilac2};
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  ${Body}
`;

const AddButtonBox = styled.div`
  width: 100%;
  min-height: 70px;
  border: 1px dashed ${StudyLilac};
  background-color: ${Lilac1};
  border-radius: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  ${Heading4Bold}
  color: ${StudyLilac};

  &:hover {
    background-color: ${Lilac2};
  }
`;

const TodoInputList = ({ listId }) => {
  const [value, setValue] = useState("");
  const [active, setActive] = useState(false);
  const { mutate: createTodo } = useCreateTodo();

  // + 버튼 클릭 → 입력창 열기
  const addInput = () => {
    if (!active) {
      setActive(true);
      setValue("");
    }
  };

  // 입력창에서 포커스가 나갈 때 → API 호출
  const handleBlur = () => {
    if (value.trim() === "") {
      setActive(false);
      return;
    }

    createTodo(
      { listId, content: value },
      {
        onSuccess: () => {
          setValue("");
          setActive(false); // 입력창 닫기
        },
      },
    );
  };

  return (
    <ListWrapper>
      {active && (
        <InputBox>
          <StyledInput
            placeholder="작성 및 수정(투두 클릭할 경우 수정)"
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
          />
        </InputBox>
      )}

      {!active && <AddButtonBox onClick={addInput}>+</AddButtonBox>}
    </ListWrapper>
  );
};

export default TodoInputList;
