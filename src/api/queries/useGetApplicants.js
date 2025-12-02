import { useQuery } from "@tanstack/react-query";
import { getApplicants } from "../Services";

export const useGetApplicants = (studyId) => {
  const { data, ...rest } = useQuery({
    queryFn: () => getApplicants(studyId),
    queryKey: ["GETAPPLICANTS"],
  });

  return { applicantsList: data?.data?.data, ...rest };
};
