import { useQuery } from "@tanstack/react-query";
import { getMyPage } from "../Services";
import { getMyPageMock } from "../mock/getMyPageMock";

export const useGetMyPage = () => {
  const { data, ...rest } = useQuery({
    queryFn: () => getMyPage(),
    queryKey: ["GETMYPAGE"],
  });

  return { myPageData: data?.data?.data, ...rest };
};
