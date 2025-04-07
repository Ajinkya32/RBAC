import CreateProductDialog from "@/components/site/product/create-product-dialog";
import ProductTable from "@/components/site/product/product-table";

export default function Products() {
  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Products</h2>
          <p className="text-muted-foreground">Here&apos;s the list of all the Products</p>
        </div>
        <CreateProductDialog />
      </div>
      <div>
        <ProductTable />
      </div>
    </div>
  );
}
