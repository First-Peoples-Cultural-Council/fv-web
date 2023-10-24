import { useParams } from 'react-router-dom'

// FPCC
import { useUserStore } from 'context/UserContext'
import { useSiteStore } from 'context/SiteContext'
import {
  ASSISTANT,
  EDITOR,
  LANGUAGE_ADMIN,
  MEMBER,
} from 'common/constants/roles'
import { useMySites } from 'common/dataHooks/useMySites'
import useLoginLogout from 'common/hooks/useLoginLogout'
import { TYPES, TYPE_WORD, TYPE_PHRASE } from 'common/constants'

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

  const homeTiles = [
    {
      icon: 'Word',
      name: 'Create a Word',
      description: 'Add a new word to your dictionary',
      href: 'create/word',
      iconColor: 'wordText',
      auth: ASSISTANT,
    },
    {
      icon: 'Phrase',
      name: 'Create a Phrase',
      description: 'Add a new phrase to your dictionary',
      href: 'create/phrase',
      iconColor: 'phraseText',
      auth: ASSISTANT,
    },
    {
      icon: 'Phrase',
      name: 'Edit Words and Phrases',
      description: 'Edit the words and phrases in your dictionary',
      href: `edit/entries?${TYPES}=${TYPE_WORD},${TYPE_PHRASE}`,
      iconColor: 'storyText',
      auth: EDITOR,
    },
    {
      icon: 'Widget',
      name: 'Create a Widget',
      description: "Add a new Widget to your site's collection",
      href: 'create/widget',
      iconColor: 'wordText',
      auth: LANGUAGE_ADMIN,
    },
    {
      icon: 'WebPages',
      name: 'Custom Pages',
      description: 'Manage all custom pages on your site',
      href: 'edit/pages',
      iconColor: 'phraseText',
      auth: LANGUAGE_ADMIN,
    },
    {
      icon: 'Home',
      name: 'Edit Your Homepage',
      description: 'Edit the main homepage for your site',
      href: 'edit/home',
      iconColor: 'wordText',
      auth: LANGUAGE_ADMIN,
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
