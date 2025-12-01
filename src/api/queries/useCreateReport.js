import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCreateReport } from "../Services";

export const useCreateReport = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postCreateReport,
    onSuccess: () => {
      queryClient.invalidateQueries(["GETREPORTS"]); // 생성 후 목록 갱신
      alert("리포트 작성 완료!");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "리포트 작성 실패");
      console.log(err);
    },
  });

  return mutation;
};
