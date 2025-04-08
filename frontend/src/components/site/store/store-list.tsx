import { useState } from "react";
import TableSkeleton from "@/components/skeleton-loaders/table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createOrderMutationFn, getAllProductsQueryFn } from "@/lib/api";
import { CreateOrderType, ProductType } from "@/types/api.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuthContext } from "@/context/auth-provider";
import { ConfirmDialog } from "@/components/resuable/confirm-dialog";

const baseURL = import.meta.env.VITE_IMAGE_BASE_URL;

export default function StoreList() {
  const { activeTeamId } = useAuthContext();
  const queryClient = useQueryClient();

  const [openDeleteDialog, setOpenDialog] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getAllProductsQueryFn(),
    staleTime: 0,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createOrderMutationFn,
  });

  // Local state to track quantities per product
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [selectedProduct, setSelectedProduct] = useState<ProductType>();

  const handleQuantityChange = (productId: string, value: string) => {
    const quantity = parseInt(value) || 0;
    setQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const handleOrder = (product: ProductType) => {
    const quantity = quantities[product._id] || 1;

    const price = product.price * quantity;

    const payload: CreateOrderType = {
      team: activeTeamId ? activeTeamId : "",
      product: product._id,
      quantity: quantity,
      price: price,
    };

    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["my-orders"],
        });
        setQuantities({});
        toast({
          title: "Success",
          description: "Order Placed successfully",
          variant: "success",
        });
        setOpenDialog(false);
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

  if (isLoading) {
    return <TableSkeleton columns={6} rows={10} />;
  }

  return (
    <div className="w-full relative flex flex-wrap gap-4 md:gap-6 lg:gap-8 justify-center md:justify-center lg:justify-between">
      {data?.map((product: ProductType) => (
        <div
          key={product._id}
          className="w-40 md:w-60 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 dark:bg-gray-900 dark:border-gray-800"
        >
          <img
            src={`${baseURL}/${product.image}`}
            alt={product.name}
            className="w-full h-30 md:h-48 object-contain"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {product.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.description}</p>
            <p className="text-base font-medium text-black dark:text-white mb-2">
              ₹{product.price}
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Button
                variant="outline"
                type="button"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  setQuantities((prev) => ({
                    ...prev,
                    [product._id]: Math.max(1, (prev[product._id] || 1) - 1),
                  }))
                }
              >
                <Minus className="w-4 h-4" />
              </Button>

              <Input
                type="number"
                min={1}
                value={quantities[product._id] || 1}
                onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                className="w-10 md:w-24 text-center"
              />

              <Button
                variant="outline"
                type="button"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  setQuantities((prev) => ({
                    ...prev,
                    [product._id]: (prev[product._id] || 1) + 1,
                  }))
                }
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                setSelectedProduct(product);
                setOpenDialog(true);
              }}
            >
              Order
            </Button>
          </div>
        </div>
      ))}

      {openDeleteDialog && (
        <ConfirmDialog
          isOpen={openDeleteDialog}
          isLoading={isPending}
          onClose={() => setOpenDialog(false)}
          onConfirm={() => selectedProduct && handleOrder(selectedProduct)}
          title="Place Order"
          description={`Are you sure you want to Place Order for ${selectedProduct?.name}?`}
          confirmText="Continue"
          cancelText="Cancel"
        />
      )}
    </div>
  );
}
