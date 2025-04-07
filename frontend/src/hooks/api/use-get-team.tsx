/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { getTeamByIdQueryFn } from "@/lib/api";
import { CustomError } from "@/types/custom-error.type";

const useGetTeamQuery = (teamId: string) => {
  const query = useQuery<any, CustomError>({
    queryKey: ["team", teamId],
    queryFn: () => getTeamByIdQueryFn(teamId),
    staleTime: 0,
    retry: 2,
    enabled: !!teamId,
  });

  return query;
};

export default useGetTeamQuery;
