import { Separator } from "@/components/ui/separator";
import SiteHeader from "@/components/site/common/site-header";
import { Permissions } from "@/constant";
import withPermission from "@/hoc/with-permission";

const Settings = () => {
  return (
    <div className="w-full h-auto py-2">
      <SiteHeader />
      <Separator className="my-4 " />
      <main>
        <div className="w-full max-w-3xl mx-auto py-3">
          <h2 className="text-[20px] leading-[30px] font-semibold mb-3">Site settings</h2>

          <div className="flex flex-col pt-0.5 px-0 ">
            <div className="pt-2">{/* <EditSiteForm /> */}</div>
            <div className="pt-2">{/* <DeleteSiteCard /> */}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

const SettingsWithPermission = withPermission(Settings, Permissions.MANAGE_WORKSPACE_SETTINGS);

export default SettingsWithPermission;
