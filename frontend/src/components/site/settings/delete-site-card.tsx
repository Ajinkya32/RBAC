import { ConfirmDialog } from "@/components/resuable/confirm-dialog";
import PermissionsGuard from "@/components/resuable/permission-guard";
import { Button } from "@/components/ui/button";
import { Permissions } from "@/constant";
import { useAuthContext } from "@/context/auth-provider";
import useConfirmDialog from "@/hooks/use-confirm-dialog";
import { toast } from "@/hooks/use-toast";
import useSiteId from "@/hooks/use-team-id";
import { deleteSiteMutationFn } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const DeleteSiteCard = () => {
  const { site } = useAuthContext();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const siteId = useSiteId();

  const { open, onOpenDialog, onCloseDialog } = useConfirmDialog();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteSiteMutationFn,
  });

  const handleConfirm = () => {
    mutate(siteId, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["userSites"],
        });
        navigate(`/site/${data.currentSite}`);
        setTimeout(() => onCloseDialog(), 100);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };
  return (
    <>
      <div className="w-full">
        <div className="mb-5 border-b">
          <h1
            className="text-[17px] tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1.5
           text-center sm:text-left"
          >
            Delete Site
          </h1>
        </div>

        <PermissionsGuard showMessage requiredPermission={Permissions.DELETE_WORKSPACE}>
          <div className="flex flex-col items-start justify-between py-0">
            <div className="flex-1 mb-2">
              <p>
                Deleting a site is a permanent action and cannot be undone. Once you delete a site,
                all its associated data, including pages, tasks, and member roles, will be
                permanently removed. Please proceed with caution and ensure this action is
                intentional.
              </p>
            </div>
            <Button
              className="shrink-0 flex place-self-end h-[40px]"
              variant="destructive"
              onClick={onOpenDialog}
            >
              Delete Site
            </Button>
          </div>
        </PermissionsGuard>
      </div>

      <ConfirmDialog
        isOpen={open}
        isLoading={isPending}
        onClose={onCloseDialog}
        onConfirm={handleConfirm}
        title={`Delete  ${site?.name} Site`}
        description={`Are you sure you want to delete? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default DeleteSiteCard;
