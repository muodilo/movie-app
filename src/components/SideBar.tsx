'use client';

import { useState } from 'react';
import Logo from './Logo';

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative h-screen md:block hidden">
      
      <div
        className={`${
          collapsed ? 'w-16' : 'w-64'
        } bg-gray-900 text-white h-full px-5 pt-4 transition-all duration-300`}
      >
        <div className="flex items-center justify-start gap-2 mb-6">
          <Logo/>
          {!collapsed && <p className="text-lg font-bold">Movie App</p>}
        </div>

        <nav className="space-y-4">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M6.133 21C4.955 21 4 20.02 4 18.81v-8.802c0-.665.295-1.295.8-1.71l5.867-4.818a2.09 2.09 0 0 1 2.666 0l5.866 4.818c.506.415.801 1.045.801 1.71v8.802c0 1.21-.955 2.19-2.133 2.19z"/><path d="M9.5 21v-5.5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2V21"/></g></svg>
            {!collapsed && <span>Home</span>}
          </div>

          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M6.133 21C4.955 21 4 20.02 4 18.81v-8.802c0-.665.295-1.295.8-1.71l5.867-4.818a2.09 2.09 0 0 1 2.666 0l5.866 4.818c.506.415.801 1.045.801 1.71v8.802c0 1.21-.955 2.19-2.133 2.19z"/><path d="M9.5 21v-5.5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2V21"/></g></svg>
            {!collapsed && <span>Home</span>}
          </div>
        </nav>
      </div>

      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className="absolute top-3 left-[calc(100%+4px)] z-20 bg-gray-900/60 p-2 rounded-lg text-white shadow cursor-pointer"
      >
        {collapsed ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24"><defs><path id="weuiArrowOutlined0" fill="currentColor" d="m7.588 12.43l-1.061 1.06L.748 7.713a.996.996 0 0 1 0-1.413L6.527.52l1.06 1.06l-5.424 5.425z"/></defs><use fill-rule="evenodd" href="#weuiArrowOutlined0" transform="rotate(-180 5.02 9.505)"/></svg>
        ) : (
          <svg className='rotate-180' xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24"><defs><path id="weuiArrowOutlined0" fill="currentColor" d="m7.588 12.43l-1.061 1.06L.748 7.713a.996.996 0 0 1 0-1.413L6.527.52l1.06 1.06l-5.424 5.425z"/></defs><use fill-rule="evenodd" href="#weuiArrowOutlined0" transform="rotate(-180 5.02 9.505)"/></svg>
        )}
      </button>
    </div>
  );
};

export default SideBar;
