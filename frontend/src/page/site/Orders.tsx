import OrderTable from "@/components/site/order/order-table";

export default function Orders() {
  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Orders</h2>
          <p className="text-muted-foreground">Here&apos;s the list of all the Orders</p>
        </div>
      </div>
      <div>
        <OrderTable />
      </div>
    </div>
  );
}
