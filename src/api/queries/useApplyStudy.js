import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApplyStudy } from "../Services";

export const useApplyStudy = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postApplyStudy,
    onSuccess: () => {
      queryClient.invalidateQueries(["GETSTUDY", studyId]); // 생성 후 목록 갱신
      alert("스터디 신청 완료!");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "스터디 신청 실패");
      console.log(err);
    },
  });

  return mutation;
};
