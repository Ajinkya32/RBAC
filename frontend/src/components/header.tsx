import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "./ui/separator";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const pathname = location.pathname;

  const getPageLabel = (pathname: string) => {
    if (pathname.includes("/dashboard")) return "Dashboard";
    if (pathname.includes("/users")) return "Users";
    if (pathname.includes("/members")) return "Team";
    if (pathname.includes("/products")) return "Products";
    if (pathname.includes("/teams")) return "Teams";
    if (pathname.includes("/orders")) return "Team";
    if (pathname.includes("/store")) return "Store";
    if (pathname.includes("/roles")) return "Roles";
    if (pathname.includes("/myorders")) return "My Orders";
    return null;
  };

  const getSubLabel = (pathname: string) => {
    if (pathname.includes("/members")) return "Members";
    if (pathname.includes("/orders")) return "Orders";
    return null;
  };

  const pageHeading = getPageLabel(pathname);

  const subHeading = getSubLabel(pathname);

  return (
    <header className="flex sticky top-0 z-50 bg-white h-12 shrink-0 items-center border-b">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block text-[15px]">
              {pageHeading && (
                <BreadcrumbPage className="line-clamp-1 ">{pageHeading}</BreadcrumbPage>
              )}
            </BreadcrumbItem>

            {subHeading && (
              <>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="text-[15px]">
                  <BreadcrumbPage className="line-clamp-1">{subHeading}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default Header;
