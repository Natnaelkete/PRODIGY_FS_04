import { useEffect, useRef } from "react";
import useGetMessage from "../hooks/useGetMessage";
import { useAuth } from "./AuthProvider";
import useListenMessages from "../hooks/useListenMessages";
import { useSocketContext } from "../socketClient/SocketContext";

function MessageContainer({ userId }) {
  const { messages } = useGetMessage(userId);
  const message = messages?.map((i) => i) || [{}];
  const { socketMessages } = useSocketContext();
  const allMessages = [...message, ...socketMessages];

  useListenMessages();

  const { user } = useAuth();
  const target = useRef();

  useEffect(() => {
    target.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, socketMessages]);

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
            <ul className="flex flex-col gap-6 h-[100%] overflow-y-scroll">
              {allMessages?.map((message, i) => (
                <li
                  key={message._id}
                  className={`flex gap-4 items-center  ${
                    user._id !== message.senderId ? "self-start" : "self-end"
                  } max-w-[70%]`}
                  ref={i === allMessages.length - 1 ? target : null}
                >
                  <img
                    src={user.profilePic}
                    className="w-[30px] h-[30px] rounded-full"
                  />
                  <div
                    className={`${
                      user._id !== message.senderId
                        ? "bg-blue-500 "
                        : "bg-gray-700"
                    }  text-white p-2 rounded-lg`}
                  >
                    <h1 className="leading-5">{message.message}</h1>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </>
  );
}

export default MessageContainer;
