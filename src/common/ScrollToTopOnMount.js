import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router'

function ScrollToTopOnMount() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    // iOS restores the scroll position from when the mobile nav opened, which
    // lands the new page partway down. Reset once more after a short delay to ensure the page is at the top.
    const timeout = setTimeout(() => window.scrollTo(0, 0), 50) // Scroll to top again after 50 milliseconds
    return () => clearTimeout(timeout)
  }, [pathname])

  return null
}

export default ScrollToTopOnMount
