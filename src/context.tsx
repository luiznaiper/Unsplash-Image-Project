import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface IAppContext {
  isDarkTheme: boolean
  toggleDarkTheme: () => void
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

interface AppProviderProps {
  children: ReactNode
}

const AppContext = createContext<IAppContext | undefined>(undefined)

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches
  const storedDarkMode = localStorage.getItem('darkTheme') === 'true'
  return storedDarkMode || prefersDarkMode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode())
  const [searchTerm, setSearchTerm] = useState('dog')

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme.toString())
  }

  useEffect(() => {
    const body = document.querySelector('body')
    body?.classList.toggle('dark-theme', isDarkTheme)
  }, [isDarkTheme])

  return (
    <AppContext.Provider
      value={{
        isDarkTheme,
        toggleDarkTheme,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = (): IAppContext => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useGlobalContext must be used within AppProvider')
  }
  return context
}
