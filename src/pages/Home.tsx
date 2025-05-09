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
        <MovieList/>
      </div>
    </section>
  )
}

export default Home