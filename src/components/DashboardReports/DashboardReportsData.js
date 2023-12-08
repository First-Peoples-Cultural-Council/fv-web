// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  TYPES,
  TYPE_DICTIONARY,
  TYPE_WORD,
  HAS_AUDIO,
  HAS_IMAGE,
  SORT,
  SORT_CREATED_DESC,
  SORT_MODIFIED_DESC,
  FALSE,
  VISIBILITY,
  VISIBILITY_PUBLIC,
  VISIBILITY_MEMBERS,
  VISIBILITY_TEAM,
} from 'common/constants'
import { EDITOR } from 'common/constants/roles'

function DashboardReportsData() {
  const { site } = useSiteStore()

  const tileContent = [
    {
      icon: 'Wrench',
      name: 'Build your own',
      description: 'Use the advanced search filters to create your own report',
      href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_WORD}`,
      iconColor: 'wordText',
      auth: EDITOR,
    },
  ]

  const reportTiles = [
    {
      icon: 'Star',
      name: 'Recently created',
      description: 'New words and phrases at the top',
      href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_DICTIONARY}&${SORT}=${SORT_CREATED_DESC}`,
      iconColor: 'story',
      auth: EDITOR,
    },
    {
      icon: 'Pencil',
      name: 'Recently modified',
      description: 'Recently edited words and phrases at the top',
      href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_DICTIONARY}&${SORT}=${SORT_MODIFIED_DESC}`,
      iconColor: 'word',
      auth: EDITOR,
    },
    {
      icon: 'MicrophoneOff',
      name: 'No audio',
      description: 'Words and phrases without audio files',
      href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_DICTIONARY}&${HAS_AUDIO}=${FALSE}`,
      iconColor: 'song',
      auth: EDITOR,
    },
    {
      icon: 'ImagesNone',
      name: 'No images',
      description: 'Words and phrases without images',
      href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_DICTIONARY}&${HAS_IMAGE}=${FALSE}`,
      iconColor: 'phrase',
      auth: EDITOR,
    },
    {
      icon: 'Team',
      name: 'Team content',
      description: 'Content only available to the language team',
      href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_DICTIONARY}&${VISIBILITY}=${VISIBILITY_TEAM}`,
      iconColor: 'phraseText',
      auth: EDITOR,
    },
    {
      icon: 'Members',
      name: 'Members only content',
      description: 'Content only available to site members',
      href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_DICTIONARY}&${VISIBILITY}=${VISIBILITY_MEMBERS}`,
      iconColor: 'tertiaryA',
      auth: EDITOR,
    },
    {
      icon: 'Public',
      name: 'Public content',
      description: 'Content available to the general public',
      href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_DICTIONARY}&${VISIBILITY}=${VISIBILITY_PUBLIC}`,
      iconColor: 'tertiaryB',
      auth: EDITOR,
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
