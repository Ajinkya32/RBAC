import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateProductForm from "./create-product-form";
import PermissionsGuard from "@/components/resuable/permission-guard";
import { Permissions } from "@/constant";

const CreateProductDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

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
              Add Product
            </Button>
          </DialogTrigger>
        </PermissionsGuard>

        <DialogContent className="sm:max-w-lg max-h-auto my-5 border-0">
          <CreateProductForm onClose={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProductDialog;
