import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postStudies } from "../Services";

export const useCreateStudy = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postStudies,
    onSuccess: () => {
      queryClient.invalidateQueries(["GETSTUDIES"]); // 생성 후 목록 갱신
      alert("스터디 생성 완료!");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "스터디 생성 실패");
      console.log(err);
    },
  });

  return mutation;
};
