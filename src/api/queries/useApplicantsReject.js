import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApplicantsReject } from "../Services";

export const useApplicantsReject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postApplicantsReject,
    onSuccess: (data, { studyId }) => {
      queryClient.invalidateQueries(["GETAPPLICANTS", studyId]); // 생성 후 목록 갱신
      alert("스터디 거절 완료");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "스터디 거절 실패");
      console.log(err);
    },
  });

  return mutation;
};
