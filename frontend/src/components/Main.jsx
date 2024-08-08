import { IoIosSend } from "react-icons/io";
import MessageContainer from "./MessageContainer";
import useCreateMessage from "../hooks/useCreateMessage";

function Main({ userId }) {
  const { createMessage } = useCreateMessage();

  function handleSubmit(e) {
    e.preventDefault();

    const inputData = new FormData(e.target);

    createMessage({ id: userId, message: inputData.get("message") });
  }

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="h-[70%] w-[60%] pt-10 ">
        <MessageContainer userId={userId} />
      </div>
      {userId && (
        <div className="flex justify-center  w-full ">
          <form className="relative w-[70%]" onSubmit={handleSubmit}>
            <input
              name="message"
              className="bg-[var(--light-background)] p-4 pl-10 pr-10 border-none rounded-full shadow-lg w-full"
            />
            <button>
              <IoIosSend
                type="submit"
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-2xl text-slate-200 cursor-pointer"
              />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Main;
