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
import { TeamType } from "@/types/api.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTeamMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EditTeamForm from "../edit-team-form";
import PermissionsGuard from "@/components/resuable/permission-guard";
import { Permissions } from "@/constant";

interface DataTableRowActionsProps {
  row: Row<TeamType>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTeam, setActiveTeam] = useState({});
  const [openDeleteDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteTeamMutationFn,
  });

  const teamId = row.original._id as string;
  const teamName = row.original.name;

  const handleConfirm = () => {
    mutate(teamId, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["all-teams"],
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
          <PermissionsGuard requiredPermission={Permissions.EDIT_TEAM}>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setActiveTeam(row.original);
                setIsOpen(true);
              }}
            >
              Edit Team
            </DropdownMenuItem>
          </PermissionsGuard>

          <PermissionsGuard requiredPermission={Permissions.DELETE_TEAM}>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={`!text-destructive cursor-pointer ${teamId}`}
              onClick={() => setOpenDialog(true)}
            >
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </PermissionsGuard>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        isOpen={openDeleteDialog}
        isLoading={isPending}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirm}
        title="Delete Team"
        description={`Are you sure you want to delete ${teamName}`}
        confirmText="Delete"
        cancelText="Cancel"
      />

      <EditTeamDialog isOpen={isOpen} setIsOpen={setIsOpen} data={activeTeam} />
    </>
  );
}

type EditTeamDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: object;
};

const EditTeamDialog = ({ isOpen, setIsOpen, data }: EditTeamDialogProps) => {
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg max-h-auto my-5 border-0">
          <EditTeamForm onClose={onClose} data={data} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
