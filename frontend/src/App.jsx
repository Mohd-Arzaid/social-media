import Body from "./components/manual/Messages/Body/Body";
import Header from "./components/manual/Messages/Header/Header";
import TextArea from "./components/manual/Messages/TextArea/TextArea";
import Profile from "./components/manual/Profile/Profile";
import Sidebar from "./components/manual/Sidebar/Sidebar";

function App() {

  return (
    <div className="relative px-[10rem] py-10 h-screen">
      <main
        className="h-full flex backdrop-blur-sm rounded-3xl bg-white/65 dark:bg-[#262626]/90 border-2 border-white
        dark:border-[#3C3C3C]/65 shadow-sm overflow-hidden"
      >
        <Sidebar />

        <div className="flex-1 flex">
          <div className="relative flex-1 border-r-2 border-white dark:border-[#3C3C3C]/60">
            <Header />
            <Body />

            <div className="absolute w-full px-4 pb-4 left-0 bottom-0">
              <TextArea />
            </div>

            {/* <div className="flex flex-col items-center justify-center h-full">
              <Profile />
            </div> */}

          </div>

          <div className="w-[30%]">
            hyy
          </div>

        </div>

      </main>
    </div>);
}

export default App;
