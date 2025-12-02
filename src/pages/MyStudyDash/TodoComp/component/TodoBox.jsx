import styled from "styled-components";
import { Body } from "../../../../styles/fonts";
import { Lilac1, Lilac2, StudyLilac, White } from "../../../../styles/colors";
import { usePatchTodoStatus } from "../../../../api/queries/usePatchTodoStatus";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: ${White};
  min-height: 68px;
  padding: 22px 24px;
  box-sizing: border-box;
  border-radius: 16px;
`;

const CheckBox = styled.input`
  width: 24px;
  height: 24px;
  flex-shrink: 0;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  border: 2px solid ${Lilac2};
  background-color: ${Lilac1};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:checked {
    background-color: ${StudyLilac};
    border-color: ${StudyLilac};
  }

  &:checked::after {
    content: "✔";
    color: ${White};
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CheckBoxLabel = styled.label`
  ${Body}
`;

const TodoBox = ({ item, listId }) => {
  const { mutate: patchTodoStatus } = usePatchTodoStatus();

  const handleCheck = () => {
    patchTodoStatus(
      { itemId: listId, isCompleted: !checked },
      {
        onSuccess: () => {
          setChecked((prev) => !prev);
        },
      },
    );
  };

  const [checked, setChecked] = useState(item.isCompleted);

  return (
    <Container>
      <CheckBox type="checkbox" checked={checked} onChange={handleCheck} />
      <CheckBoxLabel>{item.content}</CheckBoxLabel>
    </Container>
  );
};

export default TodoBox;
