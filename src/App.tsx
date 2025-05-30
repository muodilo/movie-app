import Home from "./pages/Home"
import { MovieProvider } from './context/MovieContext';

function App() {


  return (
    <>
    <MovieProvider>
      <Home/>

    </MovieProvider>
    </>
  )
}

export default App
