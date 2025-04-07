import PermissionsGuard from "@/components/resuable/permission-guard";
import CreateTeamDialog from "@/components/site/team/create-team-dialog";
import TeamTable from "@/components/site/team/team-table";
import { Permissions } from "@/constant";

export default function Teams() {
  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Teams</h2>
          <p className="text-muted-foreground">Here&apos;s the list of all the Teams</p>
        </div>
        <PermissionsGuard requiredPermission={Permissions.CREATE_TEAM}>
          <CreateTeamDialog />
        </PermissionsGuard>
      </div>
      <div>
        <TeamTable />
      </div>
    </div>
  );
}
