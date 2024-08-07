import { Users } from "../../data/Users";
import { CiLogout } from "react-icons/ci";

// eslint-disable-next-line no-unused-vars
import { IoIosSend } from "react-icons/io";

function Sidebar() {
  return (
    <div className="flex flex-col justify-center items-start p-12 h-full relative shadow-md">
      <h1 className="fixed top-10 left-10 text-3xl font-bold">Prodigy</h1>
      <ul className="h-[400px] overflow-x-scroll w-full mt-14">
        {Users.map((user) => (
          <li
            key={user.id}
            className="flex gap-6 items-center justify-start hover:bg-[#333] hover:rounded-md p-3 relative"
          >
            <div className="relative">
              <img src={user.img} className="w-[45px] h-[45px]" />
              <div className="size-3 rounded-full bg-green-400 absolute bottom-0 right-0 border"></div>
            </div>
            <p className="text-xl">{user.name}</p>
          </li>
        ))}
      </ul>
      <div className="flex gap-4 items-center mt-4">
        <CiLogout className="w-[30px] h-[30px]" />
        <p>Kebede</p>
      </div>
    </div>
  );
}

export default Sidebar;
