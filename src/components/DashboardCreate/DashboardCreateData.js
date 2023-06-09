// FPCC
import { useSiteStore } from 'context/SiteContext'

function DashboardCreateData() {
  const { site } = useSiteStore()

  const tileContent = [
    {
      icon: 'Word',
      name: 'Create a Word',
      description: 'Add a new word to your dictionary',
      href: 'word',
      iconColor: 'wordText',
      auth: 'SuperAdmin',
    },
    {
      icon: 'Phrase',
      name: 'Create a Phrase',
      description: 'Add a new phrase to your dictionary',
      href: 'phrase',
      iconColor: 'phraseText',
      auth: 'SuperAdmin',
    },
    {
      icon: 'WebPages',
      name: 'Create a Custom Page',
      description: 'Add a new page to your site',
      href: 'page',
      iconColor: 'wordText',
      auth: 'Admin',
    },
    {
      icon: 'Widget',
      name: 'Create a Widget',
      description: "Add a new Widget to your site's collection",
      href: 'widget',
      iconColor: 'wordText',
      auth: 'RecorderWithApproval',
    },
    {
      icon: 'Story',
      name: 'Create a Story',
      description: 'Add a new story to your site',
      href: 'story',
      iconColor: 'storyText',
      auth: 'SuperAdmin',
    },
    {
      icon: 'Category',
      name: 'Add a Category',
      description: 'Add a new category to your dictionary',
      href: 'category',
      iconColor: 'wordText',
      auth: 'SuperAdmin',
    },
    {
      icon: 'Speak',
      name: 'Add a Speaker',
      description: 'Add a new speaker to your site',
      href: 'speaker',
      iconColor: 'wordText',
      auth: 'SuperAdmin',
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
