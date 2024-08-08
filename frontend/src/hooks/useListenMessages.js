import { useEffect } from "react";
import { useSocketContext } from "../socketClient/SocketContext";

function useListenMessages() {
  const { setMessages, messages, socket } = useSocketContext();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      newMessage.shouldShake = true;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, setMessages, messages]); // Removed `messages` from dependencies
}

export default useListenMessages;
