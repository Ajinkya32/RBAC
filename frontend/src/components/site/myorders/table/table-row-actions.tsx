import { Dispatch, SetStateAction, useState } from "react";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/resuable/confirm-dialog";
import { OrderType } from "@/types/api.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrderMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EditOrderForm from "../edit-order-form";

interface DataTableRowActionsProps {
  row: Row<OrderType>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState({});
  const [openDeleteDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteOrderMutationFn,
  });

  const orderId = row.original._id as string;
  const orderName = row.original.name;

  const handleConfirm = () => {
    mutate(orderId, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["my-orders"],
        });
        toast({
          title: "Success",
          description: data.message,
          variant: "success",
        });
        setTimeout(() => setOpenDialog(false), 100);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.response.data.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setActiveOrder(row.original);
              setIsOpen(true);
            }}
          >
            Edit Order
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={`!text-destructive cursor-pointer ${orderId}`}
            onClick={() => setOpenDialog(true)}
          >
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        isOpen={openDeleteDialog}
        isLoading={isPending}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirm}
        title="Delete Order"
        description={`Are you sure you want to delete ${orderName}`}
        confirmText="Delete"
        cancelText="Cancel"
      />

      <EditOrderDialog isOpen={isOpen} setIsOpen={setIsOpen} data={activeOrder} />
    </>
  );
}

type EditOrderDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: object;
};

const EditOrderDialog = ({ isOpen, setIsOpen, data }: EditOrderDialogProps) => {
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg max-h-auto my-5 border-0">
          <EditOrderForm onClose={onClose} data={data} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
