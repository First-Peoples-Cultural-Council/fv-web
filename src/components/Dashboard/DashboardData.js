import { useParams } from 'react-router-dom'

// FPCC
import { useUserStore } from 'context/UserContext'
import { useSiteStore } from 'context/SiteContext'
import { EDITOR, LANGUAGE_ADMIN, MEMBER } from 'common/constants/roles'
import { useMySites } from 'common/dataHooks/useMySites'
import useLoginLogout from 'common/hooks/useLoginLogout'
import { TYPES, TYPE_WORD, TYPE_PHRASE } from 'common/constants'
import DashboardEditData from 'components/DashboardEdit/DashboardEditData'
import DashboardCreateData from 'components/DashboardCreate/DashboardCreateData'

function DashboardData() {
  const { user } = useUserStore()
  const { site } = useSiteStore()
  const { sitename } = useParams()
  const { logout } = useLoginLogout()

  // --------------------------------
  // Get user sites
  // --------------------------------

  const { isInitialLoading: userSitesIsLoading, mySitesData: userSitesData } =
    useMySites()

  const { roles } = user

  const currentUser = {
    ...user,
    isAdmin: !!(roles?.[sitename] === LANGUAGE_ADMIN || user?.isSuperAdmin),
    role: `${site?.title} ${roles?.[sitename] ? roles?.[sitename] : ''}`,
    sites: userSitesData,
  }

  const { createTiles } = DashboardCreateData({ urlPrefix: 'create' })
  const { editTiles } = DashboardEditData({ urlPrefix: 'edit' })

  const homeTiles = [
    createTiles.WORD,
    createTiles.PHRASE,
    {
      icon: 'Phrase',
      name: 'Edit words and phrases',
      description: 'Edit the words and phrases in your dictionary',
      href: `edit/entries?${TYPES}=${TYPE_WORD},${TYPE_PHRASE}`,
      iconColor: 'phraseText',
      auth: EDITOR,
    },
    createTiles.WIDGET,
    editTiles.PAGES,
    editTiles.HOMEPAGE,
    {
      icon: 'Reports',
      name: 'Reports',
      description:
        'Saved searches to help you manage dictionary content on your site.',
      href: `reports`,
      iconColor: 'tertiaryB',
      auth: EDITOR,
    },
    {
      icon: 'QuestionCircleSolid',
      name: 'Support',
      description:
        'Ask a question or find out how to do something on FirstVoices',
      href: 'https://firstvoices.atlassian.net/servicedesk/customer/portals',
      iconColor: 'songText',
      auth: MEMBER,
      externalLink: true,
    },
  ]

  return {
    currentUser,
    site,
    homeTiles,
    isLoading: userSitesIsLoading || !site,
    logout,
  }
}

export default DashboardData
