import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetSiteUsers from "@/hooks/api/use-get-site-users";
import useSiteId from "@/hooks/use-team-id";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { format } from "date-fns";
import { Loader } from "lucide-react";

const RecentUsers = () => {
  const siteId = useSiteId();
  const { data, isPending } = useGetSiteUsers(siteId);

  const users = data?.users || [];

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
        {users.map((user, index) => {
          const name = user?.userId?.name || "";
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
                  <AvatarImage src={user.userId.profilePicture || ""} alt="Avatar" />
                  <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
                </Avatar>
              </div>

              {/* User Details */}
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-900">{user.userId.name}</p>
                <p className="text-sm text-gray-500">{user.role.name}</p>
              </div>

              {/* Joined Date */}
              <div className="ml-auto text-sm text-gray-500">
                <p>Joined</p>
                <p>{user.joinedAt ? format(user.joinedAt, "PPP") : null}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentUsers;
