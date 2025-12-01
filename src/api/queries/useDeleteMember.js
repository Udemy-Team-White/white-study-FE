import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMember } from "../Services";

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries(["GETDASHBOARD"]); // 생성 후 목록 갱신
      alert("멤버 강퇴 완료");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "멤버 강퇴 실패");
      console.log(err);
    },
  });

  return mutation;
};
