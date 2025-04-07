import { useState } from "react";
import { getColumns } from "./table/columns";
import { DataTable } from "./table/table";
import { useQuery } from "@tanstack/react-query";
import { getAllProductsQueryFn } from "@/lib/api";
import { ProductType } from "@/types/api.type";

const ProductTable = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  const columns = getColumns();

  const { data, isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getAllProductsQueryFn(),
    staleTime: 0,
  });

  const products: ProductType[] = data || [];
  const totalCount: number = products?.length ? products.length : 0;

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
        data={products}
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

export default ProductTable;
