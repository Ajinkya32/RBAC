import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateTeamForm from "./create-team-form";
import PermissionsGuard from "@/components/resuable/permission-guard";
import { Permissions } from "@/constant";
import useCreateTeamDialog from "@/hooks/use-create-team-dialog";

const CreateTeamDialog = () => {
  const { isOpen, setIsOpen } = useCreateTeamDialog();

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <PermissionsGuard requiredPermission={Permissions.CREATE_PRODUCT}>
          <DialogTrigger>
            <Button>
              <Plus />
              Add Team
            </Button>
          </DialogTrigger>
        </PermissionsGuard>

        <DialogContent className="sm:max-w-lg max-h-auto my-5 border-0">
          <CreateTeamForm onClose={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTeamDialog;
