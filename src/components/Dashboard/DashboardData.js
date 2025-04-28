import { useParams } from 'react-router'

// FPCC
import { useUserStore } from 'context/UserContext'
import { useSiteStore } from 'context/SiteContext'
import {
  TYPES,
  TYPE_WORD,
  TYPE_PHRASE,
  ASSISTANT,
  MEMBER,
  VISIBILITY,
  VISIBILITY_TEAM,
} from 'common/constants'
import useLoginLogout from 'common/hooks/useLoginLogout'
import DashboardEditData from 'components/DashboardEdit/DashboardEditData'
import DashboardCreateData from 'components/DashboardCreate/DashboardCreateData'

function DashboardData() {
  const { user } = useUserStore()
  const { site } = useSiteStore()
  const { sitename } = useParams()
  const { logout } = useLoginLogout()

  const { createTiles } = DashboardCreateData({ urlPrefix: 'create' })
  const { editTiles } = DashboardEditData({ urlPrefix: 'edit' })

  const homeTiles = [
    createTiles.WORD,
    createTiles.PHRASE,
    {
      icon: 'Phrase',
      name: 'Edit words and phrases',
      description: 'Edit the words and phrases in your dictionary',
      href: `edit/entries?${TYPES}=${TYPE_WORD},${TYPE_PHRASE}${
        user?.roles?.[sitename] === ASSISTANT
          ? `&${VISIBILITY}=${VISIBILITY_TEAM}`
          : ''
      }`,
      iconColor: 'phrase-color-800',
      auth: ASSISTANT,
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
      iconColor: 'charcoal-500',
      auth: ASSISTANT,
    },
    {
      icon: 'QuestionCircleSolid',
      name: 'Support',
      description:
        'Ask a question or find out how to do something on FirstVoices',
      href: 'https://firstvoices.atlassian.net/servicedesk/customer/portals',
      iconColor: 'scarlet-900',
      auth: MEMBER,
      externalLink: true,
    },
  ]

  const currentUser = {
    ...user,
    role: `${site?.title} ${
      user?.roles?.[sitename] ? user?.roles?.[sitename] : ''
    }`,
  }

  return {
    currentUser,
    site,
    homeTiles,
    logout,
  }
}

export default DashboardData
