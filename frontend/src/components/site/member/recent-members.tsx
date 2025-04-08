import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/auth-provider";
import useGetTeamMembers from "@/hooks/api/use-get-team-members";

import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { MemberType } from "@/types/api.type";
import { format } from "date-fns";
import { Loader } from "lucide-react";

const RecentMembers = () => {
  const { activeTeamId } = useAuthContext();

  const { data: members, isPending } = useGetTeamMembers(activeTeamId ? activeTeamId : "");

  return (
    <div className="flex flex-col pt-2">
      {isPending ? (
        <Loader
          className="w-8 h-8 
        animate-spin
        place-self-center flex"
        />
      ) : null}

      <ul role="list" className="space-y-3">
        {members?.map((member: MemberType, index: number) => {
          const name = member?.user?.name || "";
          const initials = getAvatarFallbackText(name);
          const avatarColor = getAvatarColor(name);
          return (
            <li
              key={index}
              role="listitem"
              className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <Avatar className="h-9 w-9 sm:flex">
                  <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
                </Avatar>
              </div>

              {/* Member Details */}
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-900">{member.user.name}</p>
                <p className="text-sm text-gray-500">{member.user.role.name}</p>
              </div>

              {/* Joined Date */}
              <div className="ml-auto text-sm text-gray-500 w-32">
                <p>Joined</p>
                <p>{member.createdAt ? format(member.createdAt, "PPP") : null}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentMembers;
