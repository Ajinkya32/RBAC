import * as React from "react";
import { Check, ChevronDown, Loader, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTeamsUserIsMemberQueryFn, setCurrentTeam } from "@/lib/api";
import PermissionsGuard from "../resuable/permission-guard";
import { Permissions } from "@/constant";
import useCreateTeamDialog from "@/hooks/use-create-team-dialog";
import { useAuthContext } from "@/context/auth-provider";
import { TeamType } from "@/types/api.type";

export function TeamSwitcher() {
  const queryClient = useQueryClient();
  const { isMobile } = useSidebar();

  const { onOpen } = useCreateTeamDialog();
  const { activeTeamId, setActiveTeamId, setTeam, team } = useAuthContext();

  const { data, isPending } = useQuery({
    queryKey: ["userTeams"],
    queryFn: getAllTeamsUserIsMemberQueryFn,
    staleTime: 1,
    refetchOnMount: true,
  });

  const teams = data;

  const onSelect = (team: TeamType) => {
    setActiveTeamId(team._id);
    setTeam(team);
    setCurrentTeam(team._id);
  };

  return (
    <>
      <SidebarGroupLabel className="w-full justify-between pr-0">
        <span>Teams</span>
        {/* <PermissionsGuard requiredPermission={Permissions.CREATE_TEAM}>
          <button
            onClick={onOpen}
            className="flex size-5 items-center justify-center rounded-full border"
          >
            <Plus className="size-3.5" />
          </button>
        </PermissionsGuard> */}
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-gray-10"
              >
                {team ? (
                  <>
                    <div className="flex aspect-square size-8 items-center font-semibold justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      {team?.name?.split(" ")?.[0]?.charAt(0)}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{team?.name}</span>
                    </div>
                  </>
                ) : (
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">No Team selected</span>
                  </div>
                )}
                <ChevronDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">Teams</DropdownMenuLabel>
              {isPending ? <Loader className=" w-5 h-5 animate-spin" /> : null}

              {teams?.map((team: any) => (
                <DropdownMenuItem
                  key={team._id}
                  onClick={() => onSelect(team)}
                  className="gap-2 p-2 !cursor-pointer"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    {team?.name?.split(" ")?.[0]?.charAt(0)}
                  </div>
                  {team.name}

                  {team._id === activeTeamId && (
                    <DropdownMenuShortcut className="tracking-normal !opacity-100">
                      <Check className="w-4 h-4" />
                    </DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {/* <PermissionsGuard requiredPermission={Permissions.CREATE_TEAM}>
                <DropdownMenuItem className="gap-2 p-2 !cursor-pointer" onClick={onOpen}>
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">Add team</div>
                </DropdownMenuItem>
              </PermissionsGuard> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
