import Header from "../components/Header"
import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar"

const Home = () => {
  return (
    <section className="h-svh bg-black flex">
      <SideBar/>
      <div className="text-white px-5 w-full relative">
        <Navbar/>
        <Header/>
      </div>
    </section>
  )
}

export default Home