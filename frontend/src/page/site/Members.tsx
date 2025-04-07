import { Separator } from "@/components/ui/separator";
import SiteHeader from "@/components/site/common/site-header";
import AddMemberDialog from "@/components/site/member/add-member-dialog";
import AllMembers from "@/components/site/member/all-members";

export default function Members() {
  return (
    <div className="w-full h-auto pt-2">
      <SiteHeader />
      <Separator className="my-4 " />
      <main>
        <div className="w-full max-w-3xl mx-auto pt-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg leading-[30px] font-semibold mb-1">All Members</h2>
            <AddMemberDialog />
          </div>

          <Separator className="my-4 !h-[0.5px]" />

          <AllMembers />
        </div>
      </main>
    </div>
  );
}
