import { Loader } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { useAuthContext } from "@/context/auth-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import useGetTeamMembers from "@/hooks/api/use-get-team-members";
import { deleteMemberMutationFn } from "@/lib/api";
import { ConfirmDialog } from "@/components/resuable/confirm-dialog";
import { useState } from "react";
import { MemberType } from "@/types/api.type";
import { Button } from "@/components/ui/button";
import PermissionsGuard from "@/components/resuable/permission-guard";
import { Permissions } from "@/constant";

const AllMembers = () => {
  const { activeTeamId } = useAuthContext();

  const [openDeleteDialog, setOpenDialog] = useState(false);

  const [selectedMember, setSelectedMember] = useState<MemberType>();

  const queryClient = useQueryClient();

  const { data: members, isPending } = useGetTeamMembers(activeTeamId ? activeTeamId : "");

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: deleteMemberMutationFn,
  });

  const handleConfirm = (memberId: string) => {
    if (!memberId) return;

    mutate(memberId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["members"],
        });

        toast({
          title: "Success",
          description: "Member deleted successfully",
          variant: "success",
        });

        setOpenDialog(false);
        setSelectedMember(undefined);
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
    <div className="grid gap-6 pt-2">
      {isPending || isLoading ? (
        <Loader className="w-8 h-8 animate-spin place-self-center flex" />
      ) : null}

      {members?.map((member: MemberType, index: number) => {
        const name = member.user.name;
        const initials = getAvatarFallbackText(name);
        const avatarColor = getAvatarColor(name);
        return (
          <div key={index} className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{name}</p>
                <p className="text-sm text-muted-foreground">{member.user.email}</p>
              </div>
            </div>
            <PermissionsGuard requiredPermission={Permissions.DELETE_MEMBER}>
              <div className="flex items-center gap-3">
                <Button
                  className={`!text-destructive cursor-pointer ${member._id} bg-white hover:bg-white`}
                  onClick={() => {
                    setOpenDialog(true);
                    setSelectedMember(member);
                  }}
                >
                  Delete
                </Button>
              </div>
            </PermissionsGuard>
          </div>
        );
      })}
      {openDeleteDialog && (
        <ConfirmDialog
          isOpen={openDeleteDialog}
          isLoading={isPending}
          onClose={() => {
            setOpenDialog(false);
            setSelectedMember(undefined);
          }}
          onConfirm={() => handleConfirm(selectedMember._id)}
          title="Remove Member"
          description={`Are you sure you want to remove ${selectedMember.name} from the Team?`}
          confirmText="Remove"
          cancelText="Cancel"
        />
      )}
    </div>
  );
};

export default AllMembers;
