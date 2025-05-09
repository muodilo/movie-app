import Logo from "./Logo";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <div className="py-2 ">
      <div className="md:grid grid-cols-3 hidden">
        <div></div>
        <SearchBar/>
        <div></div>
      </div>

      {/* for small device */}
      <div className="md:hidden py-2 fixed top-0 left-0 right-0 z-50 bg-black px-5">
        <div className="flex items-center gap-2">
        <Logo/>
        <p className="font-bold">Movie APP</p>
        </div>
      </div>

    </div>
  );
};

export default Navbar;
