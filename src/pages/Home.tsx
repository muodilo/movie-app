import Header from "../components/HeroCarousel"
import MovieList from "../components/MovieList"
import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar"

const Home = () => {
  return (
    <section className="h-svh bg-black flex">
      <SideBar/>
      <div className="text-white px-5 w-full relative h-svh overflow-auto">
        <Navbar/>
        <Header/>
        <div className="md:flex items-center justify-end mt-6 mb-2 hidden">
          <div className="w-10 h-1 bg-red-500 rounded"></div>
          <button className="bg-red-500 px-5 py-1  rounded-full text-xs">Most popular series</button>
          <div className="w-10 h-1 bg-red-500 rounded"></div>
          
        </div>
        <MovieList/>
      </div>
    </section>
  )
}

export default Home