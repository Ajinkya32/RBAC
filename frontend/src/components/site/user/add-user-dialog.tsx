import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Permissions } from "@/constant";
import PermissionsGuard from "@/components/resuable/permission-guard";
import AddUserForm from "./add-user-form";
import { Button } from "@/components/ui/button";

const AddUserDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <PermissionsGuard requiredPermission={Permissions.CREATE_USER}>
          <DialogTrigger className="mt-1.5" asChild>
            <Button>
              <Plus />
              Add User
            </Button>
          </DialogTrigger>
        </PermissionsGuard>

        <DialogContent className="sm:max-w-lg border-0">
          <AddUserForm onClose={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddUserDialog;
