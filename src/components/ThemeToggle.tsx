
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../features/theme/themeSlice'
import type{ RootState } from '../app/store'
import { FiMoon, FiSun } from 'react-icons/fi'

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const mode = useSelector((state: RootState) => state.theme.mode)

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 text-black dark:text-white transition-colors"
      aria-label="Toggle theme"
    >
      {mode === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  )
}

export default ThemeToggle
