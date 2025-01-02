import { atom, useAtom } from 'jotai'

type Theme = 'light' | 'dark'

const themeAtom = atom<Theme>('light')

export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom)

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return { theme, toggleTheme }
}
