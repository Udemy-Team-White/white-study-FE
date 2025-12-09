import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPraise } from "../Services";

export const usePostPraise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPraise,
    onSuccess: () => {
      queryClient.invalidateQueries(["GETMYPAGE"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
