import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useAuth } from "../components/AuthProvider";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useAuth();

  // This is only to Collect Messages has no relation with Socket
  const [socketMessages, setSocketMessages] = useState([]);

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:8000", {
        query: {
          userId: user._id,
        },
      });

      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider
      value={{ socket, onlineUsers, socketMessages, setSocketMessages }}
    >
      {children}
    </SocketContext.Provider>
  );
};
