// FPCC
import { useSiteStore } from 'context/SiteContext'
import { ASSISTANT, EDITOR, LANGUAGE_ADMIN } from 'common/constants/roles'

function DashboardCreateData({ urlPrefix = '' }) {
  const { site } = useSiteStore()

  function addUrlPrefix(href) {
    if (!urlPrefix) {
      return href
    }

    return [urlPrefix, href].join('/')
  }

  const createTiles = {
    WORD: {
      icon: 'Word',
      name: 'Create a word',
      description: 'Add a new word to your dictionary',
      href: addUrlPrefix('word'),
      iconColor: 'wordText',
      auth: ASSISTANT,
    },
    PHRASE: {
      icon: 'Phrase',
      name: 'Create a phrase',
      description: 'Add a new phrase to your dictionary',
      href: addUrlPrefix('phrase'),
      iconColor: 'phraseText',
      auth: ASSISTANT,
    },
    SONG: {
      icon: 'Song',
      name: 'Create a song',
      description: 'Add a new song to your site',
      href: addUrlPrefix('song'),
      iconColor: 'songText',
      auth: ASSISTANT,
    },
    STORY: {
      icon: 'Story',
      name: 'Create a story',
      description: 'Add a new story to your site',
      href: addUrlPrefix('story'),
      iconColor: 'storyText',
      auth: ASSISTANT,
    },
    SPEAKER: {
      icon: 'Speak',
      name: 'Add a speaker',
      description: 'Add a new speaker to your site',
      href: addUrlPrefix('speaker'),
      iconColor: 'storyText',
      auth: EDITOR,
    },
    CATEGORY: {
      icon: 'Category',
      name: 'Add a category',
      description: 'Add a new category to your dictionary',
      href: addUrlPrefix('category'),
      iconColor: 'tertiaryB',
      auth: LANGUAGE_ADMIN,
    },
    WIDGET: {
      icon: 'Widget',
      name: 'Create a widget',
      description: "Add a new widget to your site's collection",
      href: addUrlPrefix('widget'),
      iconColor: 'songText',
      auth: LANGUAGE_ADMIN,
    },
    PAGE: {
      icon: 'WebPages',
      name: 'Create a custom page',
      description: 'Add a new page to your site',
      href: addUrlPrefix('page'),
      iconColor: 'tertiaryA',
      auth: LANGUAGE_ADMIN,
    },
  }

  const tileContent = [
    createTiles.WORD,
    createTiles.PHRASE,
    createTiles.SONG,
    createTiles.STORY,
    createTiles.SPEAKER,
    createTiles.CATEGORY,
    createTiles.WIDGET,
    createTiles.PAGE,
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
    createTiles,
  }
}

export default DashboardCreateData
