import { useQuery } from "@tanstack/react-query";
import { GetMessageApi } from "../services/api";
import toast from "react-hot-toast";

function useGetMessage(id) {
  const { data: messages, isLoading } = useQuery({
    queryKey: ["message", id],
    queryFn: () => GetMessageApi(id),
    onError: (err) => toast.error(err.response.data.message),
  });

  return { messages, isLoading };
}

export default useGetMessage;
