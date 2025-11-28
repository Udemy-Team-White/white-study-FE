import { useQuery } from "@tanstack/react-query";
import { getReport } from "../Services";

export const useGetReport = (reportId) => {
  const { data, ...rest } = useQuery({
    queryFn: () => getReport(reportId),
    queryKey: ["GETREPORT", reportId],
  });

  return { reportData: data?.data?.data, ...rest };
};
