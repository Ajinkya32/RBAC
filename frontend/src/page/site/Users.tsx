import { Separator } from "@/components/ui/separator";
import SiteHeader from "@/components/site/common/site-header";
import AddUserDialog from "@/components/site/user/add-user-dialog";
import AllUsers from "@/components/site/user/all-users";

export default function Users() {
  return (
    <div className="w-full h-auto pt-2">
      <SiteHeader />
      <Separator className="my-4 " />
      <main>
        <div className="w-full max-w-3xl mx-auto pt-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg leading-[30px] font-semibold mb-1">All Users</h2>
            <AddUserDialog />
          </div>

          <Separator className="my-4 !h-[0.5px]" />

          <AllUsers />
        </div>
      </main>
    </div>
  );
}
