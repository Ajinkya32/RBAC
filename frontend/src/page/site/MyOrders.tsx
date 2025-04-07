import MyOrderTable from "@/components/site/myorders/myorder-table";

export default function MyOrders() {
  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Orders</h2>
          <p className="text-muted-foreground">Here&apos;s the list of all your Orders</p>
        </div>
      </div>
      <div>
        <MyOrderTable />
      </div>
    </div>
  );
}
