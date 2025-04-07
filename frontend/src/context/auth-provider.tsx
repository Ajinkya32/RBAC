import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/api/use-auth";
import usePermissions from "@/hooks/use-permissions";
import { PermissionType } from "@/constant";
import { UserType, TeamType } from "@/types/api.type";
import { getTeamByIdQueryFn } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

type AuthContextType = {
  user?: UserType;
  team?: TeamType;
  activeTeamId?: string;
  setActiveTeamId: (teamId: string) => void;
  setTeam: (team: TeamType) => void;
  hasPermission: (permission: PermissionType) => boolean;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  teamLoading: boolean;
  refetchAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTeamId, setActiveTeamId] = useState<string>();
  const [team, setTeam] = useState<TeamType | undefined>();
  const [teamLoading, setTeamLoading] = useState(false);
  const [teamError, setTeamError] = useState<any>(null);

  const {
    data: authData,
    error: authError,
    isLoading,
    isFetching,
    refetch: refetchAuth,
  } = useAuth();

  const user = authData?.user;
  const permissions = usePermissions(user);

  const hasPermission = (permission: PermissionType): boolean => {
    return permissions.includes(permission);
  };

  useEffect(() => {
    if (user?.currentTeam) {
      setActiveTeamId(user.currentTeam._id);
    }
  }, [user]);

  useEffect(() => {
    if (activeTeamId) {
      setTeamLoading(true);
      getTeamByIdQueryFn(activeTeamId)
        .then((res) => {
          setTeam(res);
          setTeamError(null);
        })
        .catch((err) => {
          setTeamError(err);
          if (err?.errorCode === "ACCESS_UNAUTHORIZED") {
            navigate("/");
          }
        })
        .finally(() => {
          setTeamLoading(false);
        });

      queryClient.invalidateQueries({
        queryKey: ["members", activeTeamId],
      });
      queryClient.invalidateQueries({
        queryKey: ["all-orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["team-analytics"],
      });
    }
  }, [activeTeamId, navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        team,
        activeTeamId,
        setActiveTeamId,
        setTeam,
        hasPermission,
        error: authError || teamError,
        isLoading,
        isFetching,
        teamLoading,
        refetchAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
