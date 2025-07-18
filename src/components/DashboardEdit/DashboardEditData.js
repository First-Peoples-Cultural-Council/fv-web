// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  TYPES,
  TYPE_WORD,
  TYPE_PHRASE,
  TYPE_SONG,
  TYPE_STORY,
  ASSISTANT,
  EDITOR,
  LANGUAGE_ADMIN,
  VISIBILITY,
  VISIBILITY_TEAM,
} from 'common/constants'
import useAuthCheck from 'common/hooks/useAuthCheck'

function DashboardEditData({ urlPrefix = '' }) {
  const { site } = useSiteStore()

  const { checkIfUserAtLeastRole } = useAuthCheck()

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
      href: addUrlPrefix(
        `entries?${TYPES}=${TYPE_WORD}${
          checkIfUserAtLeastRole(EDITOR)
            ? ''
            : `&${VISIBILITY}=${VISIBILITY_TEAM}`
        }`,
      ),
      iconColor: 'word-color-700',
      auth: ASSISTANT,
    },
    PHRASES: {
      icon: 'Phrase',
      name: 'Edit phrases',
      description: 'Edit the phrases in your dictionary',
      href: addUrlPrefix(
        `entries?${TYPES}=${TYPE_PHRASE}${
          checkIfUserAtLeastRole(EDITOR)
            ? ''
            : `&${VISIBILITY}=${VISIBILITY_TEAM}`
        }`,
      ),
      iconColor: 'phrase-color-800',
      auth: ASSISTANT,
    },
    SONGS: {
      icon: 'Song',
      name: 'Edit songs',
      description: 'Edit the songs on your site',
      href: addUrlPrefix(
        `entries?${TYPES}=${TYPE_SONG}${
          checkIfUserAtLeastRole(EDITOR)
            ? ''
            : `&${VISIBILITY}=${VISIBILITY_TEAM}`
        }`,
      ),
      iconColor: 'song-color-900',
      auth: ASSISTANT,
    },
    STORIES: {
      icon: 'Story',
      name: 'Edit stories',
      description: 'Edit the stories on your site',
      href: addUrlPrefix(
        `entries?${TYPES}=${TYPE_STORY}${
          checkIfUserAtLeastRole(EDITOR)
            ? ''
            : `&${VISIBILITY}=${VISIBILITY_TEAM}`
        }`,
      ),
      iconColor: 'story-color-900',
      auth: ASSISTANT,
    },
    SPEAKERS: {
      icon: 'Speak',
      name: 'Edit speakers',
      description: 'Edit the speakers on your site',
      href: addUrlPrefix('speakers'),
      iconColor: 'blumine-900',
      auth: EDITOR,
    },
    CATEGORIES: {
      icon: 'Categories',
      name: 'Edit categories',
      description:
        'Edit the categories for words and phrases in your dictionary',
      href: addUrlPrefix('categories'),
      iconColor: 'charcoal-500',
      auth: LANGUAGE_ADMIN,
    },
    WIDGETS: {
      icon: 'Widget',
      name: 'Edit widgets',
      description: 'Manage and edit the widgets on your site',
      href: addUrlPrefix('widgets'),
      iconColor: 'scarlet-900',
      auth: LANGUAGE_ADMIN,
    },
    PAGES: {
      icon: 'WebPages',
      name: 'Edit custom pages',
      description: 'Manage and edit the custom pages on your site',
      href: addUrlPrefix('pages'),
      iconColor: 'charcoal-500',
      auth: LANGUAGE_ADMIN,
    },
    HOMEPAGE: {
      icon: 'Home',
      name: 'Edit homepage',
      description: 'Edit the main homepage for your site',
      href: addUrlPrefix('home'),
      iconColor: 'blumine-900',
      auth: LANGUAGE_ADMIN,
    },
    ALPHABET: {
      icon: 'Alphabet',
      name: 'Edit alphabet',
      description:
        'Update media and linked content for your alphabet characters',
      href: addUrlPrefix('alphabet'),
      iconColor: 'blumine-900',
      auth: LANGUAGE_ADMIN,
    },
    IMMERSION: {
      icon: 'Translate',
      name: 'Edit immersion labels',
      description: 'Update the labels used in immersion mode on your site',
      href: addUrlPrefix('immersion'),
      iconColor: 'charcoal-500',
      auth: LANGUAGE_ADMIN,
    },
    GALLERY: {
      icon: 'Images',
      name: 'Edit a gallery',
      description: 'Edit an image gallery on your site',
      href: addUrlPrefix('galleries'),
      iconColor: 'blumine-900',
      auth: ASSISTANT,
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
    editTiles.GALLERY,
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
