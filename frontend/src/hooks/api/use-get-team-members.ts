import { getMembersInTeamQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetTeamMembers = (teamId: string) => {
  const query = useQuery({
    queryKey: ["members", teamId],
    queryFn: () => getMembersInTeamQueryFn(teamId),
    staleTime: Infinity,
  });
  return query;
};

export default useGetTeamMembers;
