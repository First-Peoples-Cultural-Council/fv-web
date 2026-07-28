// NB: For the source of truth for this list one must refer to the API code/documents

/* Param Keys for Search API */
export const CATEGORY = 'category'
export const DOMAIN = 'domain'
export const GAMES = 'games'
export const HAS_AUDIO = 'hasAudio'
export const HAS_IMAGE = 'hasImage'
export const HAS_VIDEO = 'hasVideo'
export const HAS_TRANSLATION = 'hasTranslation'
export const HAS_CATEGORIES = 'hasCategories'
export const HAS_RELATED_ENTRIES = 'hasRelatedEntries'
export const HAS_UNRECOGNIZED_CHARS = 'hasUnrecognizedChars'
export const HAS_SITE_FEATURE = 'hasSiteFeature'
export const IMPORT_JOB_ID = 'importJobId'
export const KIDS = 'kids'
export const PAGE = 'page'
export const PAGE_SIZE = 'pageSize'
export const SITES_FILTER = 'sites'
export const SORT = 'sort'
export const SPEAKERS = 'speakers'
export const STARTS_WITH_CHAR = 'startsWithChar'
export const TYPES = 'types'
export const VISIBILITY = 'visibility'
export const MINWORDS = 'minWords'
export const MAXWORDS = 'maxWords'

// An Array of search param keys that FILTER results - excluding TYPES
export const SEARCH_FILTERS = [
  CATEGORY,
  DOMAIN,
  GAMES,
  HAS_AUDIO,
  HAS_CATEGORIES,
  HAS_IMAGE,
  HAS_RELATED_ENTRIES,
  HAS_TRANSLATION,
  HAS_UNRECOGNIZED_CHARS,
  HAS_VIDEO,
  IMPORT_JOB_ID,
  KIDS,
  SPEAKERS,
  STARTS_WITH_CHAR,
  VISIBILITY,
]

/* Recognized values for params */

// For DOMAIN
export const DOMAIN_TRANSLATION = 'translation'
export const DOMAIN_LANGUAGE = 'language'
export const DOMAIN_BOTH = 'both'

// For  GAMES, KIDS, HAS_AUDIO, HAS_IMAGE, HAS_VIDEO, HAS_TRANSLATION
export const TRUE = 'True'
export const FALSE = 'False'

// For HAS_SITE_FEATURE
export const SHARED_MEDIA = 'shared_media'

// For SORT
export const SORT_ALPHABETICAL = 'title'
export const SORT_ALPHABETICAL_DESC = 'title_desc'
export const SORT_CREATED = 'created'
export const SORT_CREATED_DESC = 'created_desc'
export const SORT_MODIFIED = 'modified'
export const SORT_MODIFIED_DESC = 'modified_desc'

// For TYPES
export const TYPE_PHRASE = 'phrase'
export const TYPE_SONG = 'song'
export const TYPE_STORY = 'story'
export const TYPE_WORD = 'word'
export const TYPE_ENTRY = 'word,phrase,song,story'
export const TYPE_DICTIONARY = 'word,phrase'
export const TYPE_MEDIA = 'audio,document,image,video'
export const TYPE_AUDIO = 'audio'
export const TYPE_DOCUMENT = 'document'
export const TYPE_IMAGE = 'image'
export const TYPE_VIDEO = 'video'

// For VISIBILITY
export const VISIBILITY_MEMBERS = 'Members'
export const VISIBILITY_PUBLIC = 'Public'
export const VISIBILITY_TEAM = 'Team'

/* Param Keys Frontend ONLY */
export const CHAR = 'char'

/* Param parse for readability */
export const getReadableParams = (paramsObject) =>
  Object.entries(paramsObject)?.map(_getReadableParam)

const _getReadableParam = ([param, value]) => {
  if (value === null || value === '') return null

  const _value = Array.isArray(value) ? value.join(', ') : String(value)
  switch (param) {
    case PAGE:
    case PAGE_SIZE:
    case SITES_FILTER:
      return null
    case CATEGORY:
      return { id: CATEGORY, label: 'Category', value: _value }
    case DOMAIN:
      return _value === DOMAIN_BOTH
        ? null
        : {
            id: DOMAIN,
            label: 'Domain',
            value: `${_value === DOMAIN_LANGUAGE ? 'Language Entries' : 'Translation'}`,
          }
    case GAMES:
      return _isValueTrue(value)
        ? { id: GAMES, label: 'Included in games' }
        : { id: GAMES, label: 'Not included in games' }
    case HAS_AUDIO:
      return _getHasLabel(HAS_AUDIO, value, 'audio')
    case HAS_IMAGE:
      return _getHasLabel(HAS_IMAGE, value, 'image')
    case HAS_VIDEO:
      return _getHasLabel(HAS_VIDEO, value, 'video')
    case HAS_TRANSLATION:
      return _getHasLabel(HAS_TRANSLATION, value, 'translation')
    case HAS_CATEGORIES:
      return _getHasLabel(HAS_CATEGORIES, value, 'category')
    case HAS_RELATED_ENTRIES:
      return _getHasLabel(HAS_RELATED_ENTRIES, value, 'related entries')
    case HAS_UNRECOGNIZED_CHARS:
      return _getHasLabel(
        HAS_UNRECOGNIZED_CHARS,
        value,
        'unrecognized characters',
      )
    case IMPORT_JOB_ID:
      return { id: IMPORT_JOB_ID, label: 'Import batch id', value: _value }
    case KIDS:
      return _isValueTrue(value)
        ? { id: KIDS, label: 'On kids site' }
        : { id: KIDS, label: 'Not on kids site' }
    case SORT:
      return { id: SORT, label: 'Sort', value: _value }
    case SPEAKERS:
      return { id: SPEAKERS, label: 'Speakers', value: _value }
    case STARTS_WITH_CHAR:
      return {
        id: STARTS_WITH_CHAR,
        label: 'Starts with character',
        value: _value,
      }
    case TYPES:
      return { id: TYPES, label: 'Types', value: _value }
    case VISIBILITY:
      return { id: VISIBILITY, label: 'Visibility', value: _value }
    case MINWORDS:
      return { id: MINWORDS, label: 'Min words', value: _value }
    case MAXWORDS:
      return { id: MAXWORDS, label: 'Max words', value: _value }
    default:
      return param
  }
}

const _isValueTrue = (value) =>
  value === true || String(value).toLowerCase() === 'true'

const _getHasLabel = (param, value, type) => {
  if (_isValueTrue(value)) {
    return { id: param, label: `Has ${type}` }
  }
  return { id: param, label: `Has no ${type}` }
}
