import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogoutApi } from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../components/AuthProvider";

function useLogout() {
  const queryClient = useQueryClient();

  const { removeCredential } = useAuth();
  const {
    mutate: logout,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => LogoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("Logged out successfully");
      removeCredential();
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { logout, isPending, error };
}

export default useLogout;
