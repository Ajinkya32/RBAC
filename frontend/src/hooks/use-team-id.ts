import { useParams } from "react-router-dom";

const useTeamId = () => {
  const params = useParams();
  return params.teamId as string;
};

export default useTeamId;
