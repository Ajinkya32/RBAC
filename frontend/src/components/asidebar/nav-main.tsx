"use client";

import { LucideIcon, Users, LayoutDashboard, Shield, Warehouse, Logs } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "@/context/auth-provider";
import { Permissions } from "@/constant";
import useTeamId from "@/hooks/use-team-id";

type ItemType = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export function NavMain() {
  const { hasPermission } = useAuthContext();

  const teamId = useTeamId();
  const location = useLocation();

  const pathname = location.pathname;

  const items: ItemType[] = [
    {
      title: "Dashboard",
      url: `/dashboard`,
      icon: LayoutDashboard,
    },

    hasPermission(Permissions.VIEW_USER)
      ? {
          title: "Users",
          url: `/users`,
          icon: Users,
        }
      : null,

    hasPermission(Permissions.VIEW_TEAM)
      ? {
          title: "Teams",
          url: `/teams`,
          icon: Shield,
        }
      : null,

    hasPermission(Permissions.EDIT_PRODUCT)
      ? {
          title: "Products",
          url: `/products`,
          icon: Warehouse,
        }
      : null,
    {
      title: "My Orders",
      url: `/myorders`,
      icon: Logs,
    },
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
