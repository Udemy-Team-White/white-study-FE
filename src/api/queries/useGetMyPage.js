import { useQuery } from "@tanstack/react-query";
import { getMyPage } from "../Services";
import { getMyPageMock } from "../mock/getMyPageMock";

export const useGetMyPage = () => {
  const { data, ...rest } = useQuery({
    queryFn: () => getMyPageMock(), //Mock은 가데이터임. getMyPage로 변경
    queryKey: ["GETMYPAGE"],
  });

  return { myPageData: data?.data, ...rest };
};
