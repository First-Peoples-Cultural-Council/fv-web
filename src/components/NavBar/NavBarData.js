import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'

function NavBarData() {
  const { sitename } = useParams()
  const { site } = useSiteStore()
  const location = useLocation()

  const isHome =
    location.pathname === `/${encodeURI(sitename)}` ||
    location.pathname === `/${encodeURI(sitename)}/`

  const isSearchPage =
    location.pathname.startsWith(`/${sitename}/search`) ||
    location.pathname.startsWith(`/${sitename}/words`) ||
    location.pathname.startsWith(`/${sitename}/phrases`)

  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false)

  const openCloseMobileNavbar = () => {
    setMobileNavbarOpen(!mobileNavbarOpen)
  }

  useEffect(() => {
    if (mobileNavbarOpen) {
      setMobileNavbarOpen(false)
    }
  }, [location])

  return {
    isHome,
    isSearchPage,
    mobileNavbarOpen,
    openCloseMobileNavbar,
    site,
  }
}

export default NavBarData
