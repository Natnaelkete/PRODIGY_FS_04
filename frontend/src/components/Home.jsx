import Main from "./Main";
import Sidebar from "./Sidebar";

function Home() {
  return (
    <div className="grid grid-rows-[1fr_100px] grid-cols-[300px_1fr] h-[100dvh]">
      <div className="row-start-1 row-end-[-1]">
        <Sidebar />
      </div>
      <div className="row-start-1 row-end-[-1] bg-[#212121]  h-full">
        <Main />
      </div>
    </div>
  );
}

export default Home;
