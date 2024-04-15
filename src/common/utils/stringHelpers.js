/* eslint-disable max-lines */
// FPCC
import {
  DOC_BOOK,
  DOC_CATEGORY,
  DOC_PAGE,
  DOC_PHRASE,
  DOC_WORD,
  DOC_AUDIO,
  DOC_IMAGE,
  DOC_VIDEO,
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

export const getFriendlyDocType = ({
  docType,
  plural = false,
  titleCase = false,
}) => {
  // Temporarily adding redundant cases to use the function with updated media types
  // until we completely switch over to new document types
  let friendly = ''
  switch (docType) {
    case DOC_AUDIO:
    case 'audio':
      friendly = 'audio'
      break
    case DOC_BOOK:
      friendly = plural ? 'songs/stories' : 'song/story'
      break
    case DOC_CATEGORY:
      friendly = plural ? 'categories' : 'category'
      break
    case DOC_IMAGE:
    case 'image':
    case 'images':
      friendly = plural ? 'images' : 'image'
      break
    case DOC_PAGE:
      friendly = plural ? 'custom pages' : 'custom page'
      break
    case DOC_PHRASE:
    case TYPE_PHRASE:
      friendly = plural ? 'phrases' : 'phrase'
      break
    case DOC_VIDEO:
    case 'video':
    case 'videos':
      friendly = plural ? 'videos' : 'video'
      break
    case DOC_WORD:
    case TYPE_WORD:
      friendly = plural ? 'words' : 'word'
      break
    default:
      friendly = plural ? 'documents' : 'document'
      break
  }
  return titleCase ? makeTitleCase(friendly) : friendly
}

export const getFriendlyDocTypes = ({
  docTypes,
  plural = false,
  titleCase = false,
  isAnd = false,
}) => {
  const friendlyTypes = docTypes?.map((docType) =>
    getFriendlyDocType({ docType, plural, titleCase }),
  )
  return friendlyTypes?.reduce((result, item, i) => {
    if (i === 0) {
      return item
    }

    const isLastItem = i === friendlyTypes.length - 1
    const finalConnector = isAnd ? ' and ' : ' or '
    return isLastItem ? result + finalConnector + item : `${result}, ${item}`
  }, '')
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
        uppercase: 'WORDS',
        singular: 'word',
        plural: 'words',
        slug: 'words',
        color: 'word',
      }
    case TYPE_PHRASE:
      return {
        uppercase: 'PHRASES',
        singular: 'phrase',
        plural: 'phrases',
        slug: 'phrases',
        color: 'phrase',
      }
    case TYPE_SONG:
      return {
        uppercase: 'SONGS',
        singular: 'song',
        plural: 'songs',
        slug: 'songs',
        color: 'song',
      }
    case TYPE_STORY:
      return {
        uppercase: 'STORIES',
        singular: 'story',
        plural: 'stories',
        slug: 'stories',
        color: 'story',
      }
    case TYPE_DICTIONARY:
      return {
        uppercase: 'DICTIONARY',
        singular: 'word / phrase',
        plural: 'words and phrases',
        slug: 'dictionary',
        color: 'word',
      }
    case TYPE_MEDIA:
      return {
        uppercase: 'MEDIA',
        singular: 'media',
        plural: 'media',
        slug: 'search',
        color: 'primary',
      }
    case TYPE_AUDIO:
      return {
        uppercase: 'AUDIO',
        singular: 'audio',
        plural: 'audio',
        slug: 'audio',
        color: 'primary',
      }
    case TYPE_IMAGE:
      return {
        uppercase: 'IMAGE',
        singular: 'image',
        plural: 'images',
        slug: 'image',
        color: 'primary',
      }
    case TYPE_VIDEO:
      return {
        uppercase: 'VIDEO',
        singular: 'video',
        plural: 'videos',
        slug: 'video',
        color: 'primary',
      }
    case TYPE_ENTRY:
    default:
      return {
        uppercase: 'DICTIONARY',
        singular: 'language entry',
        plural: 'language entries',
        slug: 'search',
        color: 'fv-charcoal',
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
    return 'Error'
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
  if (typeof string !== 'string' || string?.length < 1) return ''
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

export const getFileExtensions = (fileName) =>
  fileName?.split('.').pop().toLowerCase()

export const normalizeSpaces = (sentence) =>
  sentence.replace(/\s+/g, ' ').trim()
