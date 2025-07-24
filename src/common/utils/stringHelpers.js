import DOMPurify from 'dompurify'

// FPCC
import {
  MEMBERS,
  PUBLIC,
  TEAM,
  TYPE_DICTIONARY,
  TYPE_ENTRY,
  TYPE_PHRASE,
  TYPE_WORD,
  TYPE_STORY,
  TYPE_SONG,
  TYPE_MEDIA,
  TYPE_AUDIO,
  TYPE_DOCUMENT,
  TYPE_IMAGE,
  TYPE_VIDEO,
  UUID_REGEX,
} from 'common/constants'

export const convertMsToTimeWords = (milliseconds) => {
  let s = milliseconds
  const ms = s % 1000
  s = (s - ms) / 1000
  const secs = s % 60
  s = (s - secs) / 60
  const mins = s % 60
  const hrs = (s - mins) / 60

  return `${hrs > 0 ? `${hrs} hours ` : ''}${
    mins > 0 ? `${mins} minutes and ` : ''
  }${secs > 0 ? `${secs} seconds!` : ''}`
}

export const extractTextFromHtml = (htmlString) => {
  const span = document.createElement('span')
  span.innerHTML = htmlString
  return span.textContent || span.innerText
}

export const removeStylingFromHtml = (htmlString) =>
  // Remove all styling except line breaks, whitespace, and links
  DOMPurify.sanitize(htmlString, {
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOWED_TAGS: ['br', 'p', 'span', 'a'],
  })

export const formatHTMLForTiptap = (htmlString) => {
  // Remove the first/last instances of p tags with span to prevent automatic line breaks
  htmlString = htmlString.replace(/<p\b[^>]*>/i, '')
  htmlString = htmlString.replace(/<\/p>(?![\s\S]*<\/p>)/i, '')

  // Replace headers with <p>
  htmlString = htmlString
    .replace(/<h[1-6]>/gi, '<p>')
    .replace(/<\/h[1-6]>/gi, '</p>')

  //Remove Styling
  const strippedHtml = removeStylingFromHtml(htmlString)

  // Repair the HTML and remove empty p tags
  const parser = new DOMParser()
  const doc = parser.parseFromString(strippedHtml, 'text/html')
  const emptyTags = doc.querySelectorAll('p:empty')
  emptyTags.forEach((tag) => {
    tag.parentNode.removeChild(tag)
  })
  return doc.body.innerHTML
}

export const getFriendlyType = ({
  type,
  plural = false,
  titleCase = false,
}) => {
  let friendly = ''
  switch (type) {
    case TYPE_AUDIO:
    case 'audio':
      friendly = 'audio'
      break
    case TYPE_DOCUMENT:
      friendly = plural ? 'documents' : 'document'
      break
    case TYPE_IMAGE:
    case 'image':
    case 'images':
      friendly = plural ? 'images' : 'image'
      break
    case TYPE_PHRASE:
    case 'phrase':
    case 'phrases':
      friendly = plural ? 'phrases' : 'phrase'
      break
    case TYPE_VIDEO:
    case 'video':
    case 'videos':
      friendly = plural ? 'videos' : 'video'
      break
    case TYPE_WORD:
    case 'word':
    case 'words':
      friendly = plural ? 'words' : 'word'
      break
    default:
      friendly = plural ? 'types' : 'type'
      break
  }
  return titleCase ? makeTitleCase(friendly) : friendly
}

export const convertStateToVisibility = (state) => {
  switch (state) {
    case 'New':
    case 'Disabled':
    case TEAM:
      return TEAM
    case 'Enabled':
    case MEMBERS:
      return MEMBERS
    case 'Published':
    case PUBLIC:
      return PUBLIC
    default:
      return ''
  }
}

export const getPresentationPropertiesForType = (type) => {
  switch (type) {
    case TYPE_WORD:
      return {
        lowercase: 'words',
        uppercase: 'WORDS',
        titlecase: 'Words',
        singular: 'word',
        slug: 'words',
        color: 'word-color-500',
        textColor: 'word-color-700',
      }
    case TYPE_PHRASE:
      return {
        lowercase: 'phrases',
        uppercase: 'PHRASES',
        titlecase: 'Phrases',
        singular: 'phrase',
        slug: 'phrases',
        color: 'phrase-color-600',
        textColor: 'phrase-color-800',
      }
    case TYPE_SONG:
      return {
        lowercase: 'songs',
        uppercase: 'SONGS',
        titlecase: 'Songs',
        singular: 'song',
        slug: 'songs',
        color: 'song-color-800',
        textColor: 'song-color-900',
      }
    case TYPE_STORY:
      return {
        lowercase: 'stories',
        uppercase: 'STORIES',
        titlecase: 'Stories',
        singular: 'story',
        slug: 'stories',
        color: 'story-color-700',
        textColor: 'story-color-900',
      }
    case TYPE_DICTIONARY:
      return {
        lowercase: 'words and phrases',
        uppercase: 'DICTIONARY',
        titlecase: 'Dictionary',
        singular: 'word / phrase',
        slug: 'dictionary',
        color: 'word-color-500',
        textColor: 'word-color-700',
      }
    case TYPE_MEDIA:
      return {
        lowercase: 'media',
        uppercase: 'MEDIA',
        titlecase: 'Media',
        singular: 'media',
        slug: 'search',
        color: 'charcoal-500',
        textColor: 'charcoal-900',
      }
    case TYPE_AUDIO:
      return {
        lowercase: 'audio',
        uppercase: 'AUDIO',
        titlecase: 'Audio',
        singular: 'audio',
        slug: 'audio',
        color: 'charcoal-500',
        textColor: 'charcoal-900',
      }
    case TYPE_IMAGE:
      return {
        lowercase: 'images',
        uppercase: 'IMAGES',
        titlecase: 'Images',
        singular: 'image',
        slug: 'image',
        color: 'charcoal-500',
        textColor: 'charcoal-900',
      }
    case TYPE_VIDEO:
      return {
        lowercase: 'videos',
        uppercase: 'VIDEOS',
        titlecase: 'Videos',
        singular: 'video',
        slug: 'video',
        color: 'charcoal-500',
        textColor: 'charcoal-900',
      }
    case TYPE_ENTRY:
    default:
      return {
        lowercase: 'language entries',
        uppercase: 'LANGUAGE ENTRIES',
        titlecase: 'Language Entries',
        singular: 'language entry',
        slug: 'search',
        color: 'charcoal-500',
        textColor: 'charcoal-900',
      }
  }
}

export const isStringWithLength = (str) => {
  if (typeof str === 'string' || str instanceof String) {
    return str?.length > 0
  }
  return false
}

export const isUUID = (str) => {
  if (!str) {
    return false
  }
  const isId = str.match(UUID_REGEX)
  return !!isId
}

export const localDateMDYTwords = (dateString) => {
  if (!isStringWithLength(dateString)) return ''
  const date = new Date(dateString)
  const options = {
    timeStyle: 'short',
    dateStyle: 'long',
  }
  // Only process date if it is not NaN
  return !Number.isNaN(date)
    ? new Intl.DateTimeFormat('en-CA', options).format(date) // defaults to local time if no timeZone is set in options
    : ''
}

export const localDateMDYT = (dateString) => {
  if (!isStringWithLength(dateString)) return ''
  const date = new Date(dateString)
  const options = {
    timeStyle: 'short',
    dateStyle: 'short',
    hour12: false,
  }
  // Only process date if it is not NaN
  return !Number.isNaN(date)
    ? new Intl.DateTimeFormat('en-CA', options).format(date) // defaults to local time if no timeZone is set in options
    : ''
}

export const safeJsonParse = (str) => {
  if (typeof str !== 'string') return false
  try {
    const result = JSON.parse(str)
    const type = Object.prototype.toString.call(result)
    if (type === '[object Object]' || type === '[object Array]') {
      return result
    }
  } catch (err) {
    const error = {
      errorMessage: err,
      param: str,
    }
    return error
  }
  return false // default return case
}

// Converts JSON to a string and removes curly brackets, square brackets, and double quotes
export const convertJsonToReadableString = (json) => {
  try {
    const message = JSON.stringify(json)
    return message?.replace(/[{}[\]"]+/g, ' ') || ''
  } catch (e) {
    return `Error converting JSON: ${e.message}`
  }
}

export const makeTypeSingular = (plural) => {
  switch (plural) {
    case 'audio':
      return 'audio'
    case 'characters':
      return 'character'
    case 'images':
      return 'image'
    case 'phrases':
      return 'phrase'
    case 'songs':
      return 'song'
    case 'stories':
      return 'story'
    case 'videos':
      return 'video'
    case 'words':
      return 'word'
    default:
      return plural
  }
}

export const makePlural = (string) => {
  if (!isStringWithLength(string)) return ''
  const lastCharacter = string.slice(-1)
  if (lastCharacter === 'y') {
    const plural = string.slice(0, -1)
    return `${plural}ies`
  }
  if (lastCharacter === 's') {
    return `${string}es`
  }
  return `${string}s`
}

export const makeTitleCase = (string) =>
  string.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  )

export const capitalizeFirstLetter = (string) => {
  if (typeof string !== 'string' || string.length === 0) {
    return string // Handle empty strings or non-string inputs
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getFileExtensions = (fileName) =>
  fileName?.split('.').pop().toLowerCase()

export const normalizeSpaces = (sentence) =>
  sentence.replace(/\s+/g, ' ').trim()
