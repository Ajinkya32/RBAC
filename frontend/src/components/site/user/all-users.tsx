import { ChevronDown, Loader } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { useAuthContext } from "@/context/auth-provider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changeUserRoleMutationFn, deleteUserMutationFn, fetchRolesQueryFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { Permissions } from "@/constant";
import { useGetUsers } from "@/hooks/api/use-users";
import { ConfirmDialog } from "@/components/resuable/confirm-dialog";
import { useState } from "react";
import { RoleType, UserType } from "@/types/api.type";
import PermissionsGuard from "@/components/resuable/permission-guard";

const AllUsers = () => {
  const [openDeleteDialog, setOpenDialog] = useState(false);
  const [openChangeRoleDialog, setOpenChangeRoleDialog] = useState(false);

  const [selectedUser, setSelectedUser] = useState<UserType>();

  const [selectedRole, setSelectedRole] = useState<RoleType>();

  const { user: currentUser, hasPermission } = useAuthContext();

  const canChangeUserRole = hasPermission(Permissions.EDIT_USER);

  const queryClient = useQueryClient();

  const { data, isPending } = useGetUsers();

  const { data: roles = [], isLoading: rolesLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRolesQueryFn,
  });

  const users = data || [];

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: changeUserRoleMutationFn,
  });

  const handleSelect = (roleId: string, userId: string) => {
    if (!roleId || !userId) return;
    const payload = {
      userId,
      roleId,
    };
    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });

        toast({
          title: "Success",
          description: "User's role changed successfully",
          variant: "success",
        });
        setOpenChangeRoleDialog(false);
        setSelectedUser(undefined);
        setSelectedRole(undefined);
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

  const { mutate: mutateUserDelete, isPending: isLoadingDelete } = useMutation({
    mutationFn: deleteUserMutationFn,
  });

  const handleConfirm = (userId: string) => {
    if (!userId) return;

    mutateUserDelete(userId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });

        queryClient.invalidateQueries({
          queryKey: ["members"],
        });

        toast({
          title: "Success",
          description: "User deleted successfully",
          variant: "success",
        });

        setOpenDialog(false);
        setSelectedUser(undefined);
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
      {isPending || isLoadingDelete ? (
        <Loader className="w-8 h-8 animate-spin place-self-center flex" />
      ) : null}

      {users?.map((user: UserType, index: number) => {
        const name = user?.name;
        const initials = getAvatarFallbackText(name);
        const avatarColor = getAvatarColor(name);
        return (
          <div
            key={index}
            className="flex items-center justify-between space-x-4 flex-col md:flex-row"
          >
            <div className="flex items-center space-x-4 w-full justify-start">
              <Avatar className="h-8 w-8">
                <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full justify-end">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto min-w-24 capitalize disabled:opacity-95 disabled:pointer-events-none"
                    disabled={isLoading || !canChangeUserRole || user._id === currentUser?._id}
                  >
                    {user.role.name?.toLowerCase()}
                    {canChangeUserRole && user._id !== currentUser?._id && (
                      <ChevronDown className="text-muted-foreground" />
                    )}
                  </Button>
                </PopoverTrigger>
                {canChangeUserRole && (
                  <PopoverContent className="p-0" align="end">
                    <Command>
                      <CommandInput
                        placeholder="Select new role..."
                        disabled={isLoading}
                        className="disabled:pointer-events-none"
                      />
                      <CommandList>
                        {rolesLoading ? (
                          <Loader className="w-8 h-8 animate-spin place-self-center flex my-4" />
                        ) : (
                          <>
                            <CommandEmpty>No roles found.</CommandEmpty>
                            <CommandGroup>
                              {roles?.map(
                                (role: RoleType) =>
                                  role.name !== "ADMIN" && (
                                    <CommandItem
                                      key={role._id}
                                      disabled={isLoading}
                                      className="disabled:pointer-events-none gap-1 mb-1  flex flex-col items-start px-4 py-2 cursor-pointer"
                                      onSelect={() => {
                                        setSelectedUser(user);
                                        setSelectedRole(role);
                                        setOpenChangeRoleDialog(true);
                                      }}
                                    >
                                      <p className="capitalize">{role.name?.toLowerCase()}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {role.name === "MANAGER" &&
                                          `Can view, create, edit products and Manage orders`}

                                        {role.name === "EMPLOYEE" &&
                                          `Can view products, Place Orders and View Orders created by him`}
                                      </p>
                                    </CommandItem>
                                  )
                              )}
                            </CommandGroup>
                          </>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                )}
              </Popover>

              <PermissionsGuard requiredPermission={Permissions.DELETE_USER}>
                <div className="flex items-center gap-3">
                  <Button
                    className={`!text-destructive cursor-pointer ${user._id} bg-white hover:bg-white`}
                    onClick={() => {
                      setOpenDialog(true);
                      setSelectedUser(user);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </PermissionsGuard>
            </div>
          </div>
        );
      })}

      {openDeleteDialog && (
        <ConfirmDialog
          isOpen={openDeleteDialog}
          isLoading={isPending}
          onClose={() => {
            setOpenDialog(false);
            setSelectedUser(undefined);
          }}
          onConfirm={() => selectedUser && handleConfirm(selectedUser._id)}
          title="Remove User"
          description={`Are you sure you want to remove ${selectedUser?.name} from site?`}
          confirmText="Remove"
          cancelText="Cancel"
        />
      )}

      {openChangeRoleDialog && (
        <ConfirmDialog
          isOpen={openChangeRoleDialog}
          isLoading={isPending}
          onClose={() => {
            setOpenChangeRoleDialog(false);
            setSelectedUser(undefined);
            setSelectedRole(undefined);
          }}
          onConfirm={() =>
            selectedRole && selectedUser && handleSelect(selectedRole._id, selectedUser._id)
          }
          title="Change Role Confirmation"
          description={`Are you sure you want to change role of ${selectedUser?.name} from ${selectedUser?.role.name} to ${selectedRole?.name}?`}
          confirmText="Change"
          cancelText="Cancel"
        />
      )}
    </div>
  );
};

export default AllUsers;
