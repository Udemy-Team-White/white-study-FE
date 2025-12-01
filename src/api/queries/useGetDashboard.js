import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../Services";

export const useGetDashboard = (studyId) => {
  const { data, ...rest } = useQuery({
    queryFn: () => getDashboard(studyId),
    queryKey: ["GETDASHBOARD", studyId],
  });

  return { dashboardData: data?.data?.data, ...rest };
};
