import { useQuery } from "@tanstack/react-query";
import { getStudyId } from "../Services";

export const useGetStudy = (params) => {
  const { data, ...rest } = useQuery({
    queryFn: () => getStudyId(params),
    queryKey: ["GETSTUDY", params],
  });

  return { studyData: data?.data?.data, ...rest };
};
