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
  UUID_REGEX,
  WIDGET_ALPHABET,
  WIDGET_APPS,
  WIDGET_CONTACT,
  WIDGET_GALLERY,
  WIDGET_IFRAME,
  WIDGET_KEYBOARDS,
  WIDGET_LOGO,
  WIDGET_QUOTES,
  WIDGET_STATS,
  WIDGET_TEXT,
  WIDGET_TEXTCONCISE,
  WIDGET_TEXTFULL,
  WIDGET_TEXTICONS,
  WIDGET_TEXTMULTI,
  WIDGET_WOTD,
  DISPLAYABLE_PROPS_MEDIA,
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

export const getReadableFileSize = (size) => {
  const e = Math.log(size) / Math.log(1e3) || 0
  return `${+(size / 1e3 ** e).toFixed(2)} ${'kMGTPEZY'[e - 1] || ''}B`
}

export const getFriendlyDocType = ({
  docType,
  plural = false,
  titleCase = false,
}) => {
  let friendly = ''
  switch (docType) {
    case DOC_AUDIO:
      friendly = 'audio'
      break
    case DOC_BOOK:
      friendly = plural ? 'songs/stories' : 'song/story'
      break
    case DOC_CATEGORY:
      friendly = plural ? 'categories' : 'category'
      break
    case DOC_IMAGE:
      friendly = plural ? 'images' : 'image'
      break
    case DOC_PAGE:
      friendly = plural ? 'custom pages' : 'custom page'
      break
    case DOC_PHRASE:
      friendly = plural ? 'phrases' : 'phrase'
      break
    case DOC_VIDEO:
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

export const getWidgetTypeLabel = (type) => {
  switch (type) {
    case WIDGET_ALPHABET:
      return 'Alphabet'
    case WIDGET_APPS:
      return 'Mobile App'
    case WIDGET_CONTACT:
      return 'Contact Us'
    case WIDGET_GALLERY:
      return 'Gallery'
    case WIDGET_IFRAME:
      return 'Map'
    case WIDGET_KEYBOARDS:
      return 'Keyboard'
    case WIDGET_LOGO:
      return 'Logo'
    case WIDGET_QUOTES:
      return 'Quotes'
    case WIDGET_STATS:
      return 'New This Week'
    case WIDGET_TEXT:
      return 'Text With Image'
    case WIDGET_TEXTCONCISE:
      return 'Short Text'
    case WIDGET_TEXTFULL:
      return 'Page Text'

    case WIDGET_TEXTICONS:
      return 'Text with Icons'

    case WIDGET_TEXTMULTI:
      return 'Multi-text'
    case WIDGET_WOTD:
      return 'Word of the Day'
    default:
      return 'Unrecognised Widget Type'
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

export const getWidgetLabel = (string) => {
  switch (string) {
    case 'title':
      return 'Title'
    case 'url':
      return 'Link Url'
    case 'urlLabel':
      return 'Button Text'
    case 'text':
      return 'Subtitle'
    case 'galleryId':
      return 'Gallery'
    default:
      return string
  }
}

export const getFileExtensions = (fileName) =>
  fileName?.split('.').pop().toLowerCase()

export const isDisplayablePropMedia = (property, value) =>
  (typeof value === 'string' || value instanceof String) &&
  DISPLAYABLE_PROPS_MEDIA.includes(property)
