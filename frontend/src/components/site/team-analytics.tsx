import AnalyticsCard from "./common/analytics-card";
import { useQuery } from "@tanstack/react-query";
import { getMyOrdersAnalyticsFn, getTeamAnalyticsQueryFn } from "@/lib/api";
import { useAuthContext } from "@/context/auth-provider";

const TeamAnalytics = () => {
  const { activeTeamId, user } = useAuthContext();

  const { data, isPending } = useQuery(
    user?.role?.name === "ADMIN" || user?.role?.name === "MANAGER"
      ? {
          queryKey: ["team-analytics", activeTeamId],
          queryFn: () => getTeamAnalyticsQueryFn(activeTeamId),
          staleTime: 0,
          enabled: !!activeTeamId,
        }
      : {
          queryKey: ["order-analytics"],
          queryFn: () => getMyOrdersAnalyticsFn(),
          staleTime: 0,
        }
  );

  const analytics = data?.analytics;

  return (
    <div className="grid gap-4 md:gap-5 lg:grid-cols-2 xl:grid-cols-3">
      <AnalyticsCard
        isLoading={isPending}
        title="Total Orders"
        value={analytics?.totalOrders || 0}
      />
      <AnalyticsCard
        isLoading={isPending}
        title="Pending Orders"
        value={analytics?.pendingOrders || 0}
      />
      <AnalyticsCard
        isLoading={isPending}
        title="Delivered Orders"
        value={analytics?.deliveredOrders || 0}
      />
    </div>
  );
};

export default TeamAnalytics;
