import { PermissionType } from "@/constant";
import { UserType } from "@/types/api.type";
import { useEffect, useMemo, useState } from "react";

const usePermissions = (user: UserType | undefined) => {
  const [permissions, setPermissions] = useState<PermissionType[]>([]);

  useEffect(() => {
    if (user) {
      setPermissions(user.role.permissions || []);
    }
  }, [user]);

  return useMemo(() => permissions, [permissions]);
};

export default usePermissions;
