/* eslint-disable max-lines */
// FPCC
import {
  DOC_BOOK,
  DOC_CATEGORY,
  DOC_PAGE,
  DOC_PHRASE,
  DOC_WORD,
  DOC_STORY,
  DOC_SONG,
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
  UUID_REGEX,
} from 'common/constants'

export const cleanNXQL = (str) => {
  let _str
  if (!str) return str
  _str = decodeURIComponent(str.replace(/'/g, "\\'"))
  _str = decodeURIComponent(_str.replace(/\[/g, '\\['))
  _str = decodeURIComponent(_str.replace(/\]/g, '\\]'))
  // Escape '&' operator
  _str = _str.replace(/&/g, '%26')
  return _str
}

export const convertMilliseconds = (millis) => {
  if (Number.isNaN(millis)) return null
  const minutes = Math.floor(millis / 60000)
  const seconds = ((millis % 60000) / 1000).toFixed(0)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

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
  // Temp. adding redundant cases to use the function with updated media doc types
  // Todo: Remove the temp redundant cases.
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
      friendly = plural ? 'images' : 'image'
      break
    case DOC_PAGE:
      friendly = plural ? 'custom pages' : 'custom page'
      break
    case DOC_PHRASE:
      friendly = plural ? 'phrases' : 'phrase'
      break
    case DOC_VIDEO:
    case 'video':
      friendly = plural ? 'videos' : 'video'
      break
    case DOC_WORD:
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

export const getFvDocType = (string) => {
  const cleanString =
    typeof string === 'string' || string instanceof String
      ? string.toLowerCase()
      : ''
  switch (cleanString) {
    case 'images':
    case 'image':
    case 'gif':
    case 'gifOrImg':
      return DOC_IMAGE
    case 'audio':
      return DOC_AUDIO
    case 'video':
    case 'videos':
      return DOC_VIDEO
    case 'word':
    case 'words':
      return DOC_WORD
    case 'phrase':
    case 'phrases':
      return DOC_PHRASE
    case 'story':
    case 'stories':
    case 'song':
    case 'songs':
    case 'song/story':
      return DOC_BOOK
    default:
      return 'Unrecognised doc type term.'
  }
}

export const getSearchTypeFromDocType = (docType) => {
  switch (docType) {
    case DOC_PHRASE:
      return TYPE_PHRASE
    case DOC_SONG:
      return TYPE_SONG
    case DOC_STORY:
      return TYPE_STORY
    case DOC_WORD:
      return TYPE_WORD
    default:
      return 'Unrecognised type.'
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

export const localDateMDYT = (dateString) => {
  const d = new Date(dateString)
  const m = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]
  let hours = d.getHours()
  let minutes = d.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours %= 12
  hours = hours || 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes
  const strTime = `${hours}:${minutes} ${ampm}`

  return `${m[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} at ${strTime}`
}
export const localDateMDY = (dateString) => {
  const d = new Date(dateString)
  const month = d.getMonth() + 1
  const day = d.getDate()
  return `${month < 10 ? '0' : ''}${month}/${
    day < 10 ? '0' : ''
  }${day}/${d.getFullYear()}`
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
