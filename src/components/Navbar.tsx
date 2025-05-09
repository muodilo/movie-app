import Logo from "./Logo";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <div className="py-2 ">
      <div className="md:grid grid-cols-3 hidden">
        <div></div>
        <SearchBar />
        <div></div>
      </div>

      {/* for small device */}
      <div className="md:hidden py-2 fixed top-0 left-0 right-0 z-50 bg-black px-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <p className="font-bold">Movie APP</p>
        </div>
        <div>
          {/* <SearchBar/> */}
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"/></svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
