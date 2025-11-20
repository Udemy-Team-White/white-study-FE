import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../Services";

export const useGetCategoryList = () => {
  const { data, ...rest } = useQuery({
    queryFn: () => getCategories(),
    queryKey: ["GETCATEGORYLIST"],
  });

  return { categoryList: data?.data?.data, ...rest };
};
