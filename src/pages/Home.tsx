import Header from "../components/HeroCarousel";
import MovieList from "../components/MovieList";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";

const Home = () => {
  return (
    <section className="h-svh dark:bg-black flex">
      <SideBar />
      <div className="dark:text-white px-5 w-full scrollbar-hide relative h-svh overflow-auto">
        <Navbar />
        <Header />
        <div className=" flex items-center my-5 gap-3">
          <p className="text-2xl md:flex hidden font-bold">Continue watching</p>
          <div className="md:flex items-center  hidden">
            <div className="w-3 h-[2px] bg-red-500 rounded"></div>
            <button className="bg-red-500 h-6 w-5 rounded-xl text-xs">
              
            </button>
            <div className="w-20 h-[2px] bg-red-500 rounded"></div>
          </div>
        </div>
        <MovieList />
      </div>
    </section>
  );
};

export default Home;
