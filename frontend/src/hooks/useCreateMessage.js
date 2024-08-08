import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { CreateMessageApi } from "../services/api";

function useCreateMessage() {
  const queryClient = useQueryClient();
  const { mutate: createMessage, isPending } = useMutation({
    mutationFn: ({ id, message }) => CreateMessageApi(id, message),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["message", data]);

    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { createMessage, isPending };
}

export default useCreateMessage;
