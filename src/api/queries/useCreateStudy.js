import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postStudies } from "../Services";
import { useNavigate } from "react-router-dom";

export const useCreateStudy = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: postStudies,
    onSuccess: () => {
      queryClient.invalidateQueries(["GETSTUDIES"]); // 생성 후 목록 갱신
      alert("스터디 생성 완료!");
      navigate("/");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "스터디 생성 실패");
      console.log(err);
    },
  });

  return mutation;
};
