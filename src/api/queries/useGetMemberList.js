import { useQuery } from "@tanstack/react-query";
import { getMemberList } from "../Services";

export const useGetMemberList = (studyId) => {
  const { data, ...rest } = useQuery({
    queryFn: () => getMemberList(studyId),
    queryKey: ["GETSTUDYMEMBER", studyId],
  });

  return { memberListData: data?.data?.data, ...rest };
};
