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
      return value
        ? { id: GAMES, label: 'Included in games' }
        : { id: GAMES, label: 'Not included in games' }
    case HAS_AUDIO:
      return value
        ? { id: HAS_AUDIO, label: 'Has audio' }
        : { id: HAS_AUDIO, label: 'Has no audio' }
    case HAS_IMAGE:
      return value
        ? { id: HAS_IMAGE, label: 'Has image' }
        : { id: HAS_IMAGE, label: 'Has no image' }
    case HAS_VIDEO:
      return value
        ? { id: HAS_VIDEO, label: 'Has video' }
        : { id: HAS_VIDEO, label: 'Has no video' }
    case HAS_TRANSLATION:
      return value
        ? { id: HAS_TRANSLATION, label: 'Has translation' }
        : { id: HAS_TRANSLATION, label: 'Has no translation' }
    case HAS_CATEGORIES:
      return value
        ? { id: HAS_CATEGORIES, label: 'Has category' }
        : { id: HAS_CATEGORIES, label: 'Has no category' }
    case HAS_RELATED_ENTRIES:
      return value
        ? { id: HAS_RELATED_ENTRIES, label: 'Has related entries' }
        : { id: HAS_RELATED_ENTRIES, label: 'Has no related entries' }
    case HAS_UNRECOGNIZED_CHARS:
      return value
        ? { id: HAS_UNRECOGNIZED_CHARS, label: 'Has unrecognized characters' }
        : {
            id: HAS_UNRECOGNIZED_CHARS,
            label: 'Has no unrecognized characters',
          }
    case IMPORT_JOB_ID:
      return { id: IMPORT_JOB_ID, label: 'Import batch id', value: _value }
    case KIDS:
      return value
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
