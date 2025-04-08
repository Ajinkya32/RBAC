import { Check, ChevronDown, Loader } from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";
import { getAllTeamsUserIsMemberQueryFn, setCurrentTeam } from "@/lib/api";
import { useAuthContext } from "@/context/auth-provider";
import { TeamType } from "@/types/api.type";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();

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

              {teams?.map((team: TeamType) => (
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
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
