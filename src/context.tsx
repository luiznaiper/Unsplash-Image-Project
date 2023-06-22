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
}

interface AppProviderProps {
  children: ReactNode
}

const AppContext = createContext<IAppContext | undefined>(undefined)

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    const body = document.querySelector('body')
    body?.classList.toggle('dark-theme', newDarkTheme)
    console.log(body)
  }

  return (
    <AppContext.Provider
      value={{
        isDarkTheme,
        toggleDarkTheme,
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
