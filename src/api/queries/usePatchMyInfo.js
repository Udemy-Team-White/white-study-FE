import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMyInfo } from "../Services";

export const usePatchMyInfo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: patchMyInfo,
    onSuccess: () => {
      queryClient.invalidateQueries(["GETMYPAGE"]); // 생성 후 목록 갱신
      alert("수정 완료!");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "수정 실패");
      console.log(err);
    },
  });

  return mutation;
};
