import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postProfileImg } from "../Services";

export const usePostProfileImg = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postProfileImg,
    onSuccess: () => {
      queryClient.invalidateQueries(["GETMYPAGE"]);
      alert("프로필 이미지 업로드 완료!");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "업로드 실패!");
      console.log(err);
    },
  });
};
