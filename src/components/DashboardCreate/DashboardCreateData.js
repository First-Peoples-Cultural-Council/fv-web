// FPCC
import { useSiteStore } from 'context/SiteContext'
import { ASSISTANT, EDITOR, LANGUAGE_ADMIN } from 'common/constants/roles'

function DashboardCreateData() {
  const { site } = useSiteStore()

  const tileContent = [
    {
      icon: 'Word',
      name: 'Create a Word',
      description: 'Add a new word to your dictionary',
      href: 'word',
      iconColor: 'wordText',
      auth: ASSISTANT,
    },
    {
      icon: 'Phrase',
      name: 'Create a Phrase',
      description: 'Add a new phrase to your dictionary',
      href: 'phrase',
      iconColor: 'phraseText',
      auth: ASSISTANT,
    },
    {
      icon: 'Song',
      name: 'Create a Song',
      description: 'Add a new song to your site',
      href: 'song',
      iconColor: 'songText',
      auth: ASSISTANT,
    },
    {
      icon: 'Story',
      name: 'Create a Story',
      description: 'Add a new story to your site',
      href: 'story',
      iconColor: 'storyText',
      auth: ASSISTANT,
    },
    {
      icon: 'Speak',
      name: 'Add a Speaker',
      description: 'Add a new speaker to your site',
      href: 'speaker',
      iconColor: 'storyText',
      auth: EDITOR,
    },
    {
      icon: 'Category',
      name: 'Add a Category',
      description: 'Add a new category to your dictionary',
      href: 'category',
      iconColor: 'tertiaryB',
      auth: LANGUAGE_ADMIN,
    },
    {
      icon: 'Widget',
      name: 'Create a Widget',
      description: "Add a new Widget to your site's collection",
      href: 'widget',
      iconColor: 'songText',
      auth: LANGUAGE_ADMIN,
    },
    {
      icon: 'WebPages',
      name: 'Create a Custom Page',
      description: 'Add a new page to your site',
      href: 'page',
      iconColor: 'tertiaryA',
      auth: LANGUAGE_ADMIN,
    },
  ]
  const headerContent = {
    title: 'Create',
    subtitle: 'Create new items for your site.',
    icon: 'Add',
  }

  return {
    headerContent,
    site,
    tileContent,
  }
}

export default DashboardCreateData
