// FPCC
import { useSiteStore } from 'context/SiteContext'

function DashboardEditData() {
  const { site } = useSiteStore()

  const tileContent = [
    {
      icon: 'Phrase',
      name: 'Edit Words and Phrases',
      description: 'Edit the words and phrases in your dictionary',
      href: 'entries?docType=WORD_AND_PHRASE',
      iconColor: 'phraseText',
      auth: 'SuperAdmin',
    },
    {
      icon: 'Song',
      name: 'Edit Songs',
      description: 'Edit the songs on your site',
      href: 'entries?docType=SONG',
      iconColor: 'songText',
      auth: 'SuperAdmin',
    },
    {
      icon: 'Story',
      name: 'Edit Stories',
      description: 'Edit the stories on your site',
      href: 'entries?docType=STORY',
      iconColor: 'storyText',
      auth: 'SuperAdmin',
    },
    {
      icon: 'Home',
      name: 'Edit Homepage',
      description: 'Edit the main homepage for your site',
      href: 'home',
      iconColor: 'wordText',
      auth: 'Admin',
    },
    {
      icon: 'WebPages',
      name: 'Edit Custom Pages',
      description: 'Manage and edit the custom pages on your site',
      href: 'pages',
      iconColor: 'tertiaryA',
      auth: 'Admin',
    },
    {
      icon: 'Widget',
      name: 'Edit Widgets',
      description: 'Manage and edit the Widgets on your site',
      href: 'widgets',
      iconColor: 'songText',
      auth: 'Admin',
    },
    {
      icon: 'Categories',
      name: 'Edit Categories',
      description:
        'Edit the categories for words and phrases in your dictionary',
      href: 'categories',
      iconColor: 'tertiaryB',
      auth: 'SuperAdmin',
    },
    {
      icon: 'Speak',
      name: 'Edit Speakers',
      description: 'Edit the speakers on your site',
      href: 'speakers',
      iconColor: 'storyText',
      auth: 'SuperAdmin',
    },
    {
      icon: 'Alphabet',
      name: 'Edit your Alphabet',
      description:
        'Update media and linked content for your alphabet characters',
      href: 'alphabet',
      iconColor: 'primary',
      auth: 'SuperAdmin',
    },
    {
      icon: 'Translate',
      name: 'Edit your Immersion Labels',
      description: 'Update the labels used in immersion mode on your site',
      href: 'immersion',
      iconColor: 'tertiaryA',
      auth: 'SuperAdmin',
    },
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
