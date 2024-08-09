import { CiLogout } from "react-icons/ci";
import { IoMdCloseCircleOutline } from "react-icons/io";
import useLogout from "../hooks/useLogout";
import useGetUsers from "../hooks/useGetUsers";
import { useState } from "react";
import { useSocketContext } from "../socketClient/SocketContext";

function Drawer({ setUserId, userId, setOpen }) {
  const [selected, setSelected] = useState(false);
  const { logout } = useLogout();
  const { users } = useGetUsers();
  const { onlineUsers } = useSocketContext();

  function handleClick() {
    logout();
  }

  return (
    <div className="flex flex-col justify-center items-start p-12 h-full shadow-md relative ">
      <IoMdCloseCircleOutline
        className="absolute top-8 right-10 size-8 cursor-pointer "
        onClick={() => setOpen(!open)}
      />

      <h1 className="fixed top-10 left-10 text-3xl font-bold">Prodigy</h1>
      <ul className="h-[400px] overflow-y-scroll w-full mt-14">
        {users?.map((user) => (
          <li
            key={user._id}
            onClick={() => {
              setUserId(user._id);
              setSelected(!selected);
            }}
            className={`flex gap-6 items-center justify-start  cursor-pointer ${
              user._id === userId && "bg-[#333]"
            }  hover:bg-[#333]  hover:rounded-md p-3 relative`}
          >
            <div className="relative">
              <img src={user.profilePic} className="w-[45px] h-[45px]" />
              <div
                className={`size-3 rounded-full ${
                  onlineUsers.includes(user._id) && "bg-green-400"
                } bg-[#333] absolute bottom-0 right-0 border`}
              ></div>
            </div>
            <p className="text-xl">{user.username}</p>
          </li>
        ))}
      </ul>
      <div className="flex gap-4 items-center mt-4">
        <CiLogout
          className="w-[30px] h-[30px] cursor-pointer"
          onClick={handleClick}
        />
        <p>Kebede</p>
      </div>
    </div>
  );
}

export default Drawer;
