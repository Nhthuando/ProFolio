import { useEffect } from 'react'

export const useTheme = () => {
  useEffect(() => {
    const stored = localStorage.getItem('portfolio_builder_theme')
    document.documentElement.classList.toggle('dark', stored === 'dark')
  }, [])
}
