import { LucideIcon, Users, Store, Logs } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "@/context/auth-provider";
import { Permissions } from "@/constant";

type ItemType = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export function NavTeam() {
  const { hasPermission, activeTeamId } = useAuthContext();

  const location = useLocation();

  const pathname = location.pathname;

  const items: ItemType[] = [
    ...(activeTeamId
      ? [
          hasPermission(Permissions.VIEW_MEMBER)
            ? {
                title: "Members",
                url: `/members`,
                icon: Users,
              }
            : null,

          hasPermission(Permissions.EDIT_ORDER)
            ? {
                title: "Orders",
                url: `/orders`,
                icon: Logs,
              }
            : null,
          {
            title: "Store",
            url: `/store`,
            icon: Store,
          },
        ]
      : []),
  ].filter((item): item is ItemType => item !== null);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton isActive={item.url === pathname} asChild>
              <Link to={item.url} className="!text-[15px]">
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
