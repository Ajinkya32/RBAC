import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "./table-column-header";
import { DataTableRowActions } from "./table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductType } from "@/types/api.type";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const getColumns = (): ColumnDef<ProductType>[] => {
  const columns: ColumnDef<ProductType>[] = [
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
      accessorKey: "image",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Image" />,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={row.original.image ? `http://localhost:8000/${row.original.image}` : ""}
                alt={row.original.name}
                className="object-cover"
              />
            </Avatar>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Product Name" />,
      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap space-x-2">
            <span className="block lg:max-w-[220px] max-w-[200px] font-medium">
              {row.original.name}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap space-x-2">
            <span className="block lg:max-w-[220px] max-w-[200px] font-medium">
              {row.original.description}
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
      accessorKey: "createdBy",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created By" />,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1">
            <span className="block text-ellipsis w-[100px] truncate">
              {row.original.createdBy.name}
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
