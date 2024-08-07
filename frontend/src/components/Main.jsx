import { IoIosSend } from "react-icons/io";

function Main() {
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="h-full w-[60%] pt-10 overflow-y-scroll">df</div>
      <div className="flex justify-center p-16 w-full ">
        <div className="relative w-[70%]">
          <input className="bg-[var(--light-background)] p-4 pl-10 pr-10 border-none rounded-full shadow-lg w-full" />
          <IoIosSend className="absolute right-10 top-1/2 transform -translate-y-1/2 text-2xl text-slate-200 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Main;
