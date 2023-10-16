// FPCC
import { useSiteStore } from 'context/SiteContext'
import { TYPES, TYPE_DICTIONARY, TYPE_SONG, TYPE_STORY } from 'common/constants'
import { EDITOR, LANGUAGE_ADMIN } from 'common/constants/roles'

function DashboardEditData() {
  const { site } = useSiteStore()

  const tileContent = [
    {
      icon: 'Phrase',
      name: 'Edit Words and Phrases',
      description: 'Edit the words and phrases in your dictionary',
      href: `entries?${TYPES}=${TYPE_DICTIONARY}`,
      iconColor: 'phraseText',
      auth: EDITOR,
    },
    {
      icon: 'Song',
      name: 'Edit Songs',
      description: 'Edit the songs on your site',
      href: `entries?${TYPES}=${TYPE_SONG}`,
      iconColor: 'songText',
      auth: EDITOR,
    },
    {
      icon: 'Story',
      name: 'Edit Stories',
      description: 'Edit the stories on your site',
      href: `entries?${TYPES}=${TYPE_STORY}`,
      iconColor: 'storyText',
      auth: EDITOR,
    },
    {
      icon: 'Home',
      name: 'Edit Homepage',
      description: 'Edit the main homepage for your site',
      href: 'home',
      iconColor: 'wordText',
      auth: LANGUAGE_ADMIN,
    },
    {
      icon: 'WebPages',
      name: 'Edit Custom Pages',
      description: 'Manage and edit the custom pages on your site',
      href: 'pages',
      iconColor: 'tertiaryA',
      auth: LANGUAGE_ADMIN,
    },
    {
      icon: 'Widget',
      name: 'Edit Widgets',
      description: 'Manage and edit the Widgets on your site',
      href: 'widgets',
      iconColor: 'songText',
      auth: LANGUAGE_ADMIN,
    },
    {
      icon: 'Categories',
      name: 'Edit Categories',
      description:
        'Edit the categories for words and phrases in your dictionary',
      href: 'categories',
      iconColor: 'tertiaryB',
      auth: LANGUAGE_ADMIN,
    },
    {
      icon: 'Speak',
      name: 'Edit Speakers',
      description: 'Edit the speakers on your site',
      href: 'speakers',
      iconColor: 'storyText',
      auth: EDITOR,
    },
    {
      icon: 'Alphabet',
      name: 'Edit your Alphabet',
      description:
        'Update media and linked content for your alphabet characters',
      href: 'alphabet',
      iconColor: 'primary',
      auth: LANGUAGE_ADMIN,
    },
    // Temp. hiding for FW-4514.
    // {
    //   icon: 'Translate',
    //   name: 'Edit your Immersion Labels',
    //   description: 'Update the labels used in immersion mode on your site',
    //   href: 'immersion',
    //   iconColor: 'tertiaryA',
    //   auth: LANGUAGE_ADMIN,
    // },
  ]
  const headerContent = {
    title: 'Edit',
    subtitle: 'Edit content on your site.',
    icon: 'Pencil',
  }

  return {
    headerContent,
    site,
    tileContent,
  }
}

export default DashboardEditData
