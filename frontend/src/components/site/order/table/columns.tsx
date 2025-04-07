import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "./table-column-header";
import { DataTableRowActions } from "./table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { OrderType } from "@/types/api.type";

export const getColumns = (): ColumnDef<OrderType>[] => {
  const columns: ColumnDef<OrderType>[] = [
    {
      id: "_id",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Name" />,
      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap space-x-2">
            <span className="block lg:max-w-[220px] max-w-[200px] font-medium">
              {row.original.customer.name}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "customerId",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Id" />,
      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap space-x-2">
            <span className="block lg:max-w-[220px] max-w-[200px] font-medium">
              {row.original.customer._id}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "teamName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Team Name" />,
      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap space-x-2">
            <span className="block lg:max-w-[220px] max-w-[200px] font-medium">
              {row.original.team.name}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "teamId",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Team Id" />,
      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap space-x-2">
            <span className="block lg:max-w-[220px] max-w-[200px] font-medium">
              {row.original.team._id}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "productName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Product Name" />,
      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap space-x-2">
            <span className="block lg:max-w-[220px] max-w-[200px] font-medium">
              {row.original.product.name}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "productId",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Product Id" />,
      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap space-x-2">
            <span className="block lg:max-w-[220px] max-w-[200px] font-medium">
              {row.original.product._id}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap space-x-2">
            <span className="block lg:max-w-[220px] max-w-[200px] font-medium">
              {row.original.quantity}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap space-x-2">
            <span className="block lg:max-w-[220px] max-w-[200px] font-medium">
              {row.original.price}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap space-x-2">
            <span className="block lg:max-w-[220px] max-w-[200px] font-medium">
              {row.original.status}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
      cell: ({ row }) => {
        return (
          <span className="lg:max-w-[100px] text-sm">
            {row.original.createdAt ? format(row.original.createdAt, "PPP") : null}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <>
            <DataTableRowActions row={row} />
          </>
        );
      },
    },
  ];

  return columns;
};
