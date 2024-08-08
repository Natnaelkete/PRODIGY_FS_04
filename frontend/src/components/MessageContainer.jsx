import { useEffect, useRef } from "react";
import useGetMessage from "../hooks/useGetMessage";
import { useAuth } from "./AuthProvider";
import useListenMessages from "../hooks/useListenMessages";

function MessageContainer({ userId }) {
  const { messages } = useGetMessage(userId);
  useListenMessages();
  const { user } = useAuth();
  const target = useRef();

  useEffect(() => {
    target.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {!userId && (
        <div className="flex flex-col gap-5 justify-center items-center">
          <h1 className="text-6xl font-bold">{`Welcome ${user.username}`}</h1>
          <p>Lets start chatting</p>
        </div>
      )}
      <div className="p-4 h-[100%]">
        {messages?.length === 0 ? (
          <div className="flex flex-col gap-2 justify-center items-center p-10">
            <h1 className="text-3xl font-bold">Start conversation</h1>
            <p className="text-md text-[#ccc]">by saying Hi</p>
          </div>
        ) : (
          userId && (
            <ul className="flex flex-col gap-6 h-[100%] overflow-y-scroll">
              {messages?.map((message, i) =>
                user._id === message.senderId ? (
                  <li
                    key={message._id}
                    className="flex gap-4 items-center self-end max-w-[70%]"
                    ref={i === messages.length - 1 ? target : null}
                  >
                    <img
                      src={user.profilePic}
                      className="w-[30px] h-[30px] rounded-full"
                    />
                    <div className="bg-blue-500 text-white p-2 rounded-lg">
                      <h1 className="leading-5">{message.message}</h1>
                    </div>
                  </li>
                ) : (
                  <li
                    key={message._id}
                    className="flex gap-4 items-center self-start max-w-[70%]"
                    ref={i === messages.length - 1 ? target : null}
                  >
                    <div className="bg-gray-700 text-white p-2 rounded-lg">
                      <h1>{message.message}</h1>
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
