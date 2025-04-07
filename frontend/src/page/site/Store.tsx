import StoreList from "@/components/site/store/store-list";
import { StoreIcon } from "lucide-react";

export default function Store() {
  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <div className="flex gap-2 items-center mb-1">
            <StoreIcon />
            <h2 className="text-2xl font-bold tracking-tight">Welcome to the Store</h2>
          </div>
          <p className="text-muted-foreground">Here&apos;s the list of all available Products</p>
        </div>
      </div>
      <div>
        <StoreList />
      </div>
    </div>
  );
}
