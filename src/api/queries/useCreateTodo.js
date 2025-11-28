import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTodoItem } from "../Services";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postTodoItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["GETTODOLIST"]); // 생성 후 목록 갱신
      alert("투두 추가 완료!");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "투두 추가 실패");
      console.log(err);
    },
  });

  return mutation;
};
