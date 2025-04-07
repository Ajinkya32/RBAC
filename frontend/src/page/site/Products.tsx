import PermissionsGuard from "@/components/resuable/permission-guard";
import CreateProductDialog from "@/components/site/product/create-product-dialog";
import ProductTable from "@/components/site/product/product-table";
import { Permissions } from "@/constant";

export default function Products() {
  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Products</h2>
          <p className="text-muted-foreground">Here&apos;s the list of all the Products</p>
        </div>
        <PermissionsGuard requiredPermission={Permissions.CREATE_PRODUCT}>
          <CreateProductDialog />
        </PermissionsGuard>
      </div>
      <div>
        <ProductTable />
      </div>
    </div>
  );
}
