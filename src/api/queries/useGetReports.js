import { useQuery } from "@tanstack/react-query";
import { getReports } from "../Services";

export const useGetReports = (studyId) => {
  const { data, ...rest } = useQuery({
    queryFn: () => getReports(studyId),
    queryKey: ["GETREPORTS", studyId],
  });

  return { reportsData: data?.data?.data, ...rest };
};
