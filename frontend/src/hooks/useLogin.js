import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginApi } from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../components/AuthProvider";

function useLogin() {
  const queryClient = useQueryClient();
  const { setCredential } = useAuth();
  const {
    mutate: login,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (formData) => LoginApi(formData),
    onSuccess: (data) => {
      queryClient.setQueryData(["user", data]);
      toast.success("Logged in successfully");
      setCredential(data);
    },
    onError: (err) => {
      toast.error(err.response?.data.message);
    },
  });

  return { login, isPending, isError, error };
}

export default useLogin;
