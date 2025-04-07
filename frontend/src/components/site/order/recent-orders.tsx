import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/auth-provider";
import { getAllOrdersQueryFn, getMyOrdersQueryFn } from "@/lib/api";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { OrderType } from "@/types/api.type";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader } from "lucide-react";

const RecentOrders = () => {
  const { activeTeamId, user } = useAuthContext();

  const { data: orders, isPending } = useQuery(
    user?.role?.name === "ADMIN" || user?.role?.name === "MANAGER"
      ? {
          queryKey: ["all-orders"],
          queryFn: () => getAllOrdersQueryFn(activeTeamId ? activeTeamId : ""),
          staleTime: 0,
        }
      : {
          queryKey: ["my-orders"],
          queryFn: () => getMyOrdersQueryFn(),
          staleTime: 0,
        }
  );

  return (
    <div className="flex flex-col pt-2">
      {isPending ? (
        <Loader
          className="w-8 h-8 
        animate-spin
        place-self-center flex"
        />
      ) : null}

      <ul role="list" className="space-y-3">
        {orders?.map((order: OrderType, index) => {
          const name = order.customer?.name || "";
          const initials = getAvatarFallbackText(name);
          const avatarColor = getAvatarColor(name);
          return (
            <li
              key={index}
              role="listitem"
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              {/* Avatar */}
              <div className="flex flex-row gap-4 items-center">
                <Avatar className="h-9 w-9 sm:flex">
                  <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
                </Avatar>

                {/* Member Details */}
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-gray-900">{order.customer.name}</p>
                  <p className="text-sm text-gray-500">{order.customer.role.name}</p>
                </div>
              </div>

              {/* Tean Details */}
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-900">{order.team.name}</p>
              </div>

              {/* Product Details */}
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-900">{order.product.name}</p>
              </div>

              {/* Order Details */}
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-900">{order.status}</p>
              </div>

              {/* Joined Date */}
              <div className="text-sm text-gray-500">
                <p>Created At</p>
                <p>{order.createdAt ? format(order.createdAt, "PPP") : null}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentOrders;
