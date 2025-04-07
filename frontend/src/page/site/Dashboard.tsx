import RecentMembers from "@/components/site/member/recent-members";
import RecentOrders from "@/components/site/order/recent-orders";
import TeamAnalytics from "@/components/site/team-analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthContext } from "@/context/auth-provider";

const SiteDashboard = () => {
  const { user } = useAuthContext();

  return (
    <main className="flex flex-1 flex-col py-4 md:pt-3">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team Overview</h2>
          <p className="text-muted-foreground">Here&apos;s an overview for this site!</p>
        </div>
      </div>
      <TeamAnalytics />
      <div className="mt-4">
        <Tabs defaultValue="orders" className="w-full border rounded-lg p-2">
          <TabsList className="w-full justify-start border-0 bg-gray-50 px-1 h-12">
            <TabsTrigger className="py-2" value="orders">
              Recent Orders
            </TabsTrigger>

            {user?.role?.name == "ADMIN" || user?.role?.name == "MANAGER" ? (
              <TabsTrigger className="py-2" value="members">
                Recent Members
              </TabsTrigger>
            ) : null}
          </TabsList>
          <TabsContent value="orders">
            <RecentOrders />
          </TabsContent>

          {user?.role?.name == "ADMIN" || user?.role?.name == "MANAGER" ? (
            <TabsContent value="members">
              <RecentMembers />
            </TabsContent>
          ) : null}
        </Tabs>
      </div>
    </main>
  );
};

export default SiteDashboard;
