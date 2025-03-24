// NB: For the source of truth for this list one must refer to the API code/documents

/* Param Keys for Search API */
export const CATEGORY = 'category'
export const DOMAIN = 'domain'
export const GAMES = 'games'
export const HAS_AUDIO = 'hasAudio'
export const HAS_IMAGE = 'hasImage'
export const HAS_VIDEO = 'hasVideo'
export const HAS_TRANSLATION = 'hasTranslation'
export const HAS_UNRECOGNIZED_CHARS = 'hasUnrecognizedChars'
export const HAS_SITE_FEATURE = 'hasSiteFeature'
export const KIDS = 'kids'
export const PAGE = 'page'
export const PAGE_SIZE = 'pageSize'
export const SORT = 'sort'
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
  HAS_IMAGE,
  HAS_VIDEO,
  HAS_TRANSLATION,
  HAS_UNRECOGNIZED_CHARS,
  KIDS,
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
