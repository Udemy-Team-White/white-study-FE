import { useQuery } from "@tanstack/react-query";
import { getMyStudies } from "../Services";

export const useGetMyStudies = (params) => {
  const { data, ...rest } = useQuery({
    queryFn: () => getMyStudies(params),
    queryKey: ["GETMYSTUDIES", params],
  });

  return { myStudiesData: data?.data?.data, ...rest };
};
