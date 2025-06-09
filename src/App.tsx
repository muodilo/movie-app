import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Watchlist from './pages/Watchlist'
import ThemeToggle from './components/ThemeToggle'
import { useEffect } from 'react'
import type {  RootState } from "./app/store";
import { useSelector } from 'react-redux'

function App() {
    const mode = useSelector((state: RootState) => state.theme.mode)
  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [mode]) 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
      <ThemeToggle />
    </Router>
  )
}

export default App
