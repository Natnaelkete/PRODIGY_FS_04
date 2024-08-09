import { useEffect } from "react";
import { useSocketContext } from "../socketClient/SocketContext";
import notificationSound from "../assets/notification.mp3";

function useListenMessages() {
  const { setSocketMessages, socketMessages, socket } = useSocketContext();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setSocketMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, setSocketMessages, socketMessages]);
}

export default useListenMessages;
