import { useState } from 'react';
import Logo from './Logo';
import { IoIosArrowBack } from "react-icons/io";
import { CiHome } from "react-icons/ci";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className="relative h-screen md:block hidden">
      
      <div
        className={`${
          collapsed ? 'w-16' : 'w-64'
        } bg-gray-  border-r-2 border-slate-800 text-white h-full px-5 pt-4 transition-all duration-300`}
      >
        <div className="flex items-center justify-start gap-2 mb-6">
          <Logo/>
          {!collapsed && <p className="text-lg font-bold">Movie App</p>}
        </div>

        <nav className="space-y-4">
          <div className="flex items-center gap-3">
            <CiHome/>
            {!collapsed && <span>Home</span>}
          </div>

          <div className="flex items-center gap-3">
            <CiHome/>
            {!collapsed && <span>Home</span>}
          </div>
        </nav>
      </div>

      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className="absolute top-3 left-[calc(100%+4px)] z-20 border-2 bg-black border-slate-800 p-2 rounded-lg text-white shadow cursor-pointer"
      >
        {collapsed ? (
          <IoIosArrowBack className='rotate-180'/>
        ) : (
          <IoIosArrowBack />
        )}
      </button>
    </aside>
  );
};

export default SideBar;
