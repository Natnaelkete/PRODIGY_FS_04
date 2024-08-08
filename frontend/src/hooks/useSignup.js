import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignupApi } from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../components/AuthProvider";

function useSignup() {
  const queryClient = useQueryClient();
  const { setCredential } = useAuth();
  const {
    mutate: signup,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (formData) => SignupApi(formData),
    onSuccess: (data) => {
      queryClient.setQueryData(["user", data]);
      toast.success("Registered successfully");
      setCredential(data);
    },
    onError: (err) => {
      toast.error(err.response?.data.message);
      console.log(err.response?.data.message);
    },
  });

  return { signup, isPending, isError, error };
}

export default useSignup;
