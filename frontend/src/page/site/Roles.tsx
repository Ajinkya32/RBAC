import { useEffect, useState } from "react";
import { PermissionType } from "@/constant";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchRolesQueryFn, editRoleMutationFn } from "@/lib/api";
import { Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { RoleType } from "@/types/api.type";

// Group permissions
const permissionGroups: Record<string, PermissionType[]> = {
  Products: ["CREATE_PRODUCT", "VIEW_PRODUCT", "EDIT_PRODUCT", "DELETE_PRODUCT"],
  Users: ["CREATE_USER", "VIEW_USER", "EDIT_USER", "DELETE_USER"],
  Orders: ["CREATE_ORDER", "VIEW_ORDER", "EDIT_ORDER", "DELETE_ORDER"],
  Members: ["CREATE_MEMBER", "VIEW_MEMBER", "EDIT_MEMBER", "DELETE_MEMBER"],
  Teams: ["CREATE_TEAM", "VIEW_TEAM", "EDIT_TEAM", "DELETE_TEAM"],
  Roles: ["CREATE_ROLE", "VIEW_ROLE", "EDIT_ROLE", "DELETE_ROLE"],
};

export default function Roles() {
  const queryClient = useQueryClient();

  const [updatedRoles, setUpdatedRoles] = useState<Record<string, Set<PermissionType>>>({});

  const { data: roles = [], isLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRolesQueryFn,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: editRoleMutationFn,
  });

  const handleSave = async (roleId: string) => {
    if (!roleId) return;

    const permissions = Array.from(updatedRoles[roleId]);

    const payload = {
      roleId: roleId,
      permissions: permissions,
    };

    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["roles"] });
        toast({
          title: "Success",
          description: "Permissions updated successfully",
          variant: "success",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error?.response?.data?.message || "An unexpected error occurred",
          variant: "destructive",
        });
      },
    });
  };

  useEffect(() => {
    if (roles) {
      const mapped = Object.fromEntries(
        roles.map((role: RoleType) => [role._id, new Set(role.permissions)])
      );
      setUpdatedRoles(mapped);
    }
  }, [roles]);

  const handleTogglePermission = (roleId: string, permission: PermissionType) => {
    setUpdatedRoles((prev) => {
      const current = new Set(prev[roleId]);
      if (current.has(permission)) {
        current.delete(permission);
      } else {
        current.add(permission);
      }
      return { ...prev, [roleId]: current };
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-auto pt-6 px-6">
      <h1 className="text-2xl font-bold mb-4">Manage Role Permissions</h1>
      {roles.map((role: RoleType) => (
        <div key={role._id} className="mb-10 border p-4 rounded-md bg-white dark:bg-gray-900">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{role.name}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(permissionGroups)
              .filter(([groupName]) => !(groupName === "Roles" && role.name === "ADMIN"))
              .map(([groupName, perms]) => (
                <div key={groupName}>
                  <h3 className="font-medium text-muted-foreground mb-2">{groupName}</h3>
                  <div className="space-y-2">
                    {perms.map((perm) => (
                      <label key={perm} className="flex items-center space-x-2 text-sm">
                        <Checkbox
                          checked={updatedRoles[role._id]?.has(perm)}
                          onCheckedChange={() => handleTogglePermission(role._id, perm)}
                        />
                        <span>{perm.replace(/_/g, " ")}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-4">
            <Button disabled={isPending} onClick={() => handleSave(role._id)}>
              {isPending ? <Loader /> : "Save Changes"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
