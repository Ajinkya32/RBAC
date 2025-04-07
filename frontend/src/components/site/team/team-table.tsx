import { useState } from "react";
import { getColumns } from "./table/columns";
import { DataTable } from "./table/table";
import { useQuery } from "@tanstack/react-query";
import { getAllTeamsQueryFn } from "@/lib/api";
import { TeamType } from "@/types/api.type";

const TeamTable = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  const columns = getColumns();

  const { data, isLoading } = useQuery({
    queryKey: ["all-teams"],
    queryFn: () => getAllTeamsQueryFn(),
    staleTime: 0,
  });

  const teams: TeamType[] = data || [];
  const totalCount: number = teams?.length ? teams.length : 0;

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  // Handle page size changes
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };

  return (
    <div className="w-full relative">
      <DataTable
        isLoading={isLoading}
        data={teams}
        columns={columns}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pagination={{
          totalCount,
          pageNumber,
          pageSize,
        }}
      />
    </div>
  );
};

export default TeamTable;
