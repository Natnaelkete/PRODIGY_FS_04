import { useState } from "react";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Drawer from "./Drawer";

function Home() {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  return (
    <div className="grid grid-rows-[1fr_100px] grid-cols-[300px_1fr] h-[100dvh]">
      <div className="row-start-1 hidden sm:block row-end-[-1]">
        <Sidebar setUserId={setUserId} userId={userId} />
      </div>

      {open && (
        <div
          className={`fixed top-0 left-0 bottom-0 bg-[#212121] shadow-xl w-[300px] z-[999] s`}
        >
          <Drawer setUserId={setUserId} userId={userId} setOpen={setOpen} />
        </div>
      )}
      <div className="row-start-1 row-end-[-1] bg-[#212121]  h-full w-screen sm:w-full">
        <Main userId={userId} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default Home;
