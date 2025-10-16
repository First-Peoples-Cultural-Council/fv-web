// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  TYPES,
  TYPE_DICTIONARY,
  HAS_AUDIO,
  HAS_IMAGE,
  HAS_CATEGORIES,
  KIDS,
  SORT,
  SORT_CREATED_DESC,
  SORT_MODIFIED_DESC,
  FALSE,
  VISIBILITY,
  VISIBILITY_PUBLIC,
  VISIBILITY_MEMBERS,
  VISIBILITY_TEAM,
} from 'common/constants'
import { ASSISTANT } from 'common/constants/roles'

function DashboardReportsData() {
  const { site } = useSiteStore()

  const tileContent = [
    {
      icon: 'Wrench',
      name: 'Build your own',
      description: 'Use the advanced search filters to create your own report',
      href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_DICTIONARY}`,
      iconColor: 'blumine-800',
      auth: ASSISTANT,
    },
  ]

  const reportTiles = [
    {
      icon: 'Star',
      name: 'Recently created',
      description: 'New words and phrases at the top',
      href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_DICTIONARY}&${SORT}=${SORT_CREATED_DESC}`,
      iconColor: 'scarlet-800',
      auth: ASSISTANT,
    },
    {
      icon: 'Pencil',
      name: 'Recently modified',
      description: 'Recently edited words and phrases at the top',
      href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_DICTIONARY}&${SORT}=${SORT_MODIFIED_DESC}`,
      iconColor: 'blumine-800',
      auth: ASSISTANT,
    },
    {
      icon: 'MicrophoneOff',
      name: 'No audio',
      description: 'Words and phrases without audio files',
      href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_DICTIONARY}&${HAS_AUDIO}=${FALSE}`,
      iconColor: 'scarlet-800',
      auth: ASSISTANT,
    },
    {
      icon: 'ImagesNone',
      name: 'No images',
      description: 'Words and phrases without images',
      href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_DICTIONARY}&${HAS_IMAGE}=${FALSE}`,
      iconColor: 'charcoal-500',
      auth: ASSISTANT,
    },
    {
      icon: 'CategoriesNone',
      name: 'No categories',
      description: 'Words and phrases without categories',
      href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_DICTIONARY}&${HAS_CATEGORIES}=${FALSE}`,
      iconColor: 'charcoal-500',
      auth: ASSISTANT,
    },
    {
      icon: 'Team',
      name: 'Team content',
      description: 'Content only available to the language team',
      href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_DICTIONARY}&${VISIBILITY}=${VISIBILITY_TEAM}`,
      iconColor: 'scarlet-800',
      auth: ASSISTANT,
    },
    {
      icon: 'Members',
      name: 'Members only content',
      description: 'Content only available to site members',
      href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_DICTIONARY}&${VISIBILITY}=${VISIBILITY_MEMBERS}`,
      iconColor: 'charcoal-500',
      auth: ASSISTANT,
    },
    {
      icon: 'Public',
      name: 'Public content',
      description: 'Content available to the general public',
      href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_DICTIONARY}&${VISIBILITY}=${VISIBILITY_PUBLIC}`,
      iconColor: 'blumine-800',
      auth: ASSISTANT,
    },
    {
      icon: 'KidsExclude',
      name: 'Not on Kids site',
      description: 'Words and phrases that are excluded from the Kids site',
      href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_DICTIONARY}&${KIDS}=${FALSE}`,
      iconColor: 'blumine-800',
      auth: ASSISTANT,
    },
  ]

  const headerContent = {
    title: 'Reports',
    subtitle:
      'Saved searches to help you manage dictionary content on your site.',
    icon: 'Reports',
  }

  return {
    headerContent,
    site,
    reportTiles,
    tileContent,
  }
}

export default DashboardReportsData
