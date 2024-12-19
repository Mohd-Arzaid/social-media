import { Archive, Database, MessageCircleMore, Moon, Sun, UserRound } from 'lucide-react';
import React, { useState } from 'react'
import SearchInput from '../SearchInput/SearchInput';

const navButtons = [
  {
    id: 0,
    name: "All Chats",
    icon: MessageCircleMore,
    slug: "all-chats",
  },
  {
    id: 1,
    name: "Archived",
    icon: Archive,
    slug: "archived",
  },
  {
    id: 2,
    name: "Requests",
    icon: UserRound,
    slug: "requests",
    notification: true,
  },
];

const renderIcon = (IconComponent) => {
  return <IconComponent />;
};

const Sidebar = () => {
  // Hardcoded friendRequests data
  const friendRequests = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ];


  const [activeNav, setActiveNav] = useState(navButtons[0].id);

  return (
    <div className="w-[25rem] flex border-r-2 border-white dark:border-[#3C3C3C]/60">
      <div className="p-4 flex flex-col justify-between items-center border-r-2 border-white dark:border-[#3C3C3C]/60">

        {/* Image */}
        <div
          className="profile flex flex-col items-center"
        >
          <img
            src="https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png"
            alt="profile"
            width={50}
            height={50}
            className="aspect-square rounded-full object-cover border-2 border-white dark:border-[#3C3C3C]/65
                cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out shadow-sm select-text"
          />
        </div>
        <div className="w-full relative py-4 flex flex-col items-center gap-8 text-[#454e56] text-lg border-2 border-white dark:border-[#3C3C3C]/65 rounded-[30px] shadow-sm">
          {navButtons.map((btn, i) => (
            <button key={btn.id}
              className={`${activeNav === i ? `active-nav dark:gradientText` : ""
                } relative p-1 flex items-center text-[#454e56] dark:text-white/65`}
            >
              {renderIcon(btn.icon)}

              {btn.notification && (
                <span className=" absolute -top-2 right-0 w-4 h-4 bg-[#f00] text-white text-xs rounded-full flex items-center justify-center">
                  {friendRequests.length > 0 ? friendRequests.length : "0"}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-2 text-[#454e56] text-xl flex flex-col gap-2 border-2 border-white dark:border-[#3C3C3C]/65 rounded-[30px] shadow-sm dark:text-white/65">
          <button >
            <Moon />
          </button>
          <span className="w-full h-[2px] bg-white dark:bg-[#3C3C3C]/60"></span>
          <button>
            <Sun />
          </button>
        </div>

      </div>

      <div className=' pb-4 flex-1'>
        <h2
          className={`px-4 mt-6 font-bold text-2xl gradientText dark:text-white`}
        >
          Messages
        </h2>
        <div className="px-4 mt-2">
          <SearchInput />
        </div>




      </div>
    </div>
  )
}

export default Sidebar
