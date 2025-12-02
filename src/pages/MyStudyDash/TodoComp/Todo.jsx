import styled from "styled-components";
import TodoBox from "./component/TodoBox";
import { Lilac0 } from "../../../styles/colors";
import { Heading4Bold, Heading5 } from "../../../styles/fonts";
import { formatDate } from "../../../utils/formatDate";
import { useGetTodoList } from "../../../api/queries/useGetTodoList";
import { useState } from "react";
import TodoInputList from "./component/TodoInputList";

const todoList = {
  todoListId: 0,
  title: "string (플래너 그룹 제목, 예: '오전 루틴', '알고리즘 문제풀이')",
  createAt: new Date("2025-04-14"),
  targetDate: new Date("2025-05-14"),
  items: [
    {
      todoItemId: 1,
      content:
        "string (할 일 내용, 예: '백준 1001번 풀기')string (할 일 내용, 예: '백준 1001번 풀기')string (할 일 내용, 예: '백준 1001번 풀기')string (할 일 내용, 예: '백준 1001번 풀기')",
      isCompleted: true,
    },
    {
      todoItemId: 2,
      content: "string (예: '프로그래머스 1번 풀기')",
      isCompleted: false,
    },
  ],
};

const Container = styled.div`
  background-color: ${Lilac0};
  max-width: 1080px;
  margin: auto;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.div`
  ${Heading4Bold}
  text-align: center;
`;

const DateBox = styled.div`
  ${Heading5}
  text-align: center;
`;

const Todo = ({ studyId }) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const { todoList } = useGetTodoList({ studyId, date });

  return (
    <Container>
      <Title>{todoList?.title}</Title>
      <DateBox>
        {formatDate(todoList?.createdDate)} ~ {formatDate(todoList?.targetDate)}
      </DateBox>
      {todoList?.items?.map((item) => (
        <TodoBox key={item.todoItemId} item={item} listId={item?.todoItemId} />
      ))}
      <TodoInputList listId={todoList?.todoListId} />
    </Container>
  );
};

export default Todo;
