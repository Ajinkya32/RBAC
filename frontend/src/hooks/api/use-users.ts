import { getUsersQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsersQueryFn(),
    staleTime: Infinity,
  });
  return query;
};
