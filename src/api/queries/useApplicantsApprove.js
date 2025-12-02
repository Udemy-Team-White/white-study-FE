import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApplicantsApprove } from "../Services";

export const useApplicantsApprove = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postApplicantsApprove,
    onSuccess: (data, { studyId }) => {
      queryClient.invalidateQueries(["GETAPPLICANTS", studyId]); // 생성 후 목록 갱신
      alert("스터디 승인 완료!");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "스터디 승인 실패");
      console.log(err);
    },
  });

  return mutation;
};
