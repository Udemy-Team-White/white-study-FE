import { useQuery } from "@tanstack/react-query";
import { getStudies } from "../Services";
import { getStudiesMock } from "../mock/getStudiesMock";

export const useGetStudies = (params) => {
  const { data, ...rest } = useQuery({
    queryFn: () => getStudiesMock(params),
    queryKey: ["GETSTUDIES", params],
  });

  return { StudiesData: data?.data, ...rest };
};
