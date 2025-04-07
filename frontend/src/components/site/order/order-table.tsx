import { useState } from "react";
import { getColumns } from "./table/columns";
import { DataTable } from "./table/table";
import { useQuery } from "@tanstack/react-query";
import { getAllOrdersQueryFn } from "@/lib/api";
import { OrderType } from "@/types/api.type";
import { useAuthContext } from "@/context/auth-provider";

const OrderTable = () => {
  const { activeTeamId } = useAuthContext();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  const columns = getColumns();

  const { data, isLoading } = useQuery({
    queryKey: ["all-orders"],
    queryFn: () => getAllOrdersQueryFn(activeTeamId ? activeTeamId : ""),
    staleTime: 0,
  });

  const orders: OrderType[] = data || [];
  const totalCount: number = orders?.length ? orders.length : 0;

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
        data={orders}
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

export default OrderTable;
