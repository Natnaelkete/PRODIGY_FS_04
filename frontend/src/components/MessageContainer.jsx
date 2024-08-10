import { useEffect, useRef } from "react";
import useGetMessage from "../hooks/useGetMessage";
import { useAuth } from "./AuthProvider";
import useListenMessages from "../hooks/useListenMessages";
import { useSocketContext } from "../socketClient/SocketContext";

function MessageContainer({ userId }) {
  const { messages } = useGetMessage(userId);
  const { socketMessages } = useSocketContext();
  const message = messages?.map((i) => i) || [{}];

  const { user } = useAuth();
  const target = useRef();

  // Combine and filter out duplicates
  const allMessages = [...message, ...socketMessages]
    .reduce((acc, current) => {
      const duplicate = acc.find((item) => item._id === current._id);
      if (!duplicate) {
        acc.push(current);
      }
      return acc;
    }, [])
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  useListenMessages();

  useEffect(() => {
    target.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  return (
    <>
      {!userId && (
        <div className="flex flex-col gap-5 justify-center items-center">
          <h1 className="text-6xl font-bold text-center">{`Welcome ${user.username}`}</h1>
          <p>Lets start chatting</p>
        </div>
      )}
      <div className="p-4 h-[100%]">
        {allMessages?.length === 0 ? (
          <div className="flex flex-col gap-2 justify-center items-center p-10">
            <h1 className="text-3xl font-bold">Start conversation</h1>
            <p className="text-md text-[#ccc]">by saying Hi</p>
          </div>
        ) : (
          userId && (
            <ul className="flex flex-col gap-4 h-[100%] overflow-y-scroll">
              {allMessages.map((message, i) =>
                user._id === message.senderId ? (
                  <li
                    key={message._id || i}
                    className="flex gap-2 items-center self-end max-w-[70%]"
                    ref={i === allMessages.length - 1 ? target : null}
                  >
                    <div className="flex flex-col items-end mr-5">
                      <div className="bg-gray-700 text-white p-3 rounded-lg shadow">
                        <h1 className="leading-5 place-items-center">
                          {message.message}
                        </h1>
                      </div>
                      <small className="text-gray-400 mt-3">
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </small>
                    </div>
                  </li>
                ) : (
                  <li
                    key={message._id || i}
                    className="flex gap-2 items-center self-start max-w-[70%]"
                    ref={i === allMessages.length - 1 ? target : null}
                  >
                    <div className="flex flex-col items-start">
                      <div className="bg-blue-500 text-white p-3 rounded-lg shadow">
                        <h1 className="leading-5">{message.message}</h1>
                      </div>
                      <small className="text-gray-400 mt-3">
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </small>
                    </div>
                  </li>
                )
              )}
            </ul>
          )
        )}
      </div>
    </>
  );
}

export default MessageContainer;
