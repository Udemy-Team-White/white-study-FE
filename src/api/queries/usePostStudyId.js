import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postStudyId } from "../Services";
import { useNavigate } from "react-router-dom";

export const usePostStudyId = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: postStudyId,
    onSuccess: (data, { studyId }) => {
      queryClient.invalidateQueries(["GETSTUDY", studyId]); // 생성 후 목록 갱신
      alert("스터디 정보 수정 완료!");
      navigate(-1);
    },
    onError: (err) => {
      alert(err.response?.data?.message || "스터디 정보 수정 실패");
      console.log(err);
    },
  });

  return mutation;
};
