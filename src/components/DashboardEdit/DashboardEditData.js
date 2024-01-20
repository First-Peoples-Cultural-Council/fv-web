// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  TYPES,
  TYPE_WORD,
  TYPE_PHRASE,
  TYPE_SONG,
  TYPE_STORY,
} from 'common/constants'
import { EDITOR, LANGUAGE_ADMIN } from 'common/constants/roles'

function DashboardEditData({ urlPrefix = '' }) {
  const { site } = useSiteStore()

  function addUrlPrefix(href) {
    if (!urlPrefix) {
      return href
    }

    return [urlPrefix, href].join('/')
  }

  const editTiles = {
    WORDS: {
      icon: 'Word',
      name: 'Edit words',
      description: 'Edit the words in your dictionary',
      href: addUrlPrefix(`entries?${TYPES}=${TYPE_WORD}`),
      iconColor: 'wordText',
      auth: EDITOR,
    },
    PHRASES: {
      icon: 'Phrase',
      name: 'Edit phrases',
      description: 'Edit the phrases in your dictionary',
      href: addUrlPrefix(`entries?${TYPES}=${TYPE_PHRASE}`),
      iconColor: 'phraseText',
      auth: EDITOR,
    },
    SONGS: {
      icon: 'Song',
      name: 'Edit songs',
      description: 'Edit the songs on your site',
      href: addUrlPrefix(`entries?${TYPES}=${TYPE_SONG}`),
      iconColor: 'songText',
      auth: EDITOR,
    },
    STORIES: {
      icon: 'Story',
      name: 'Edit stories',
      description: 'Edit the stories on your site',
      href: addUrlPrefix(`entries?${TYPES}=${TYPE_STORY}`),
      iconColor: 'storyText',
      auth: EDITOR,
    },
    SPEAKERS: {
      icon: 'Speak',
      name: 'Edit speakers',
      description: 'Edit the speakers on your site',
      href: addUrlPrefix('speakers'),
      iconColor: 'storyText',
      auth: EDITOR,
    },
    CATEGORIES: {
      icon: 'Categories',
      name: 'Edit categories',
      description:
        'Edit the categories for words and phrases in your dictionary',
      href: addUrlPrefix('categories'),
      iconColor: 'tertiaryB',
      auth: LANGUAGE_ADMIN,
    },
    WIDGETS: {
      icon: 'Widget',
      name: 'Edit widgets',
      description: 'Manage and edit the widgets on your site',
      href: addUrlPrefix('widgets'),
      iconColor: 'songText',
      auth: LANGUAGE_ADMIN,
    },
    PAGES: {
      icon: 'WebPages',
      name: 'Edit custom pages',
      description: 'Manage and edit the custom pages on your site',
      href: addUrlPrefix('pages'),
      iconColor: 'tertiaryA',
      auth: LANGUAGE_ADMIN,
    },
    HOMEPAGE: {
      icon: 'Home',
      name: 'Edit homepage',
      description: 'Edit the main homepage for your site',
      href: addUrlPrefix('home'),
      iconColor: 'wordText',
      auth: LANGUAGE_ADMIN,
    },
    ALPHABET: {
      icon: 'Alphabet',
      name: 'Edit your alphabet',
      description:
        'Update media and linked content for your alphabet characters',
      href: addUrlPrefix('alphabet'),
      iconColor: 'primary',
      auth: LANGUAGE_ADMIN,
    },
    IMMERSION: {
      icon: 'Translate',
      name: 'Edit your Immersion Labels',
      description: 'Update the labels used in immersion mode on your site',
      href: addUrlPrefix('immersion'),
      iconColor: 'tertiaryA',
      auth: LANGUAGE_ADMIN,
    },
  }

  const tileContent = [
    editTiles.WORDS,
    editTiles.PHRASES,
    editTiles.SONGS,
    editTiles.STORIES,
    editTiles.SPEAKERS,
    editTiles.CATEGORIES,
    editTiles.WIDGETS,
    editTiles.PAGES,
    editTiles.HOMEPAGE,
    editTiles.ALPHABET,
    editTiles.IMMERSION,
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
    editTiles,
  }
}

export default DashboardEditData
