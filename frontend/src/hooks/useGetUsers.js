import { useQuery } from "@tanstack/react-query";
import { GetUsersApi } from "../services/api";
import toast from "react-hot-toast";

function useGetUsers() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: GetUsersApi,
    onError: (err) => toast.error(err.response.data.message),
  });

  return { users, isLoading };
}

export default useGetUsers;
