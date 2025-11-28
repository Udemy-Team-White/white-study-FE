import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchTodoStatus } from "../Services";

export const usePatchTodoStatus = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ itemId, isCompleted }) =>
      patchTodoStatus(itemId, isCompleted),
    onSuccess: () => {
      queryClient.invalidateQueries(["GETTODOLIST"]); // 생성 후 목록 갱신
      alert("투두 완료!");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "투두 완료 실패");
      console.log(err);
    },
  });

  return mutation;
};
