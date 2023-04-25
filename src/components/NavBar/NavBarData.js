import { useLocation, useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'

function NavBarData() {
  const { sitename } = useParams()
  const location = useLocation()
  const isHome =
    location.pathname === `/${encodeURI(sitename)}` ||
    location.pathname === `/${encodeURI(sitename)}/`

  const isSearchPage =
    location.pathname.startsWith(`/${sitename}/search`) ||
    location.pathname.startsWith(`/${sitename}/words`) ||
    location.pathname.startsWith(`/${sitename}/phrases`)

  const { site } = useSiteStore()

  return {
    isHome,
    isSearchPage,
    menuData: site?.menu || {},
    title: site?.title,
  }
}

export default NavBarData
