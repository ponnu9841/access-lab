import { useEffect, useState } from 'react'
import { useTheme as useNextTheme } from 'next-themes'

export const useTheme = () => {
  const { theme, setTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return { theme: mounted ? theme : undefined, toggleTheme }
}

