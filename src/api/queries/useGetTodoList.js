import { useQuery } from "@tanstack/react-query";
import { getTodoList } from "../Services";

export const useGetTodoList = ({ studyId, date }) => {
  const { data, ...rest } = useQuery({
    queryFn: () => getTodoList(studyId, date),
    queryKey: ["GETTODOLIST", studyId, date],
  });

  return { todoList: data?.data?.data, ...rest };
};
