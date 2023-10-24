// NB: For the source of truth for this list one must refer to the API code/documents

/* Param Keys for Search API */
export const CATEGORY = 'category'
export const DOMAIN = 'domain'
export const GAMES = 'games'
export const KIDS = 'kids'
export const PAGE = 'page'
export const PAGE_SIZE = 'pageSize'
export const STARTS_WITH_CHAR = 'startsWithChar'
export const TYPES = 'types'

/* Recognized values for params */

// For DOMAIN
export const DOMAIN_TRANSLATION = 'translation'
export const DOMAIN_LANGUAGE = 'language'
export const DOMAIN_BOTH = 'both'

// For  GAMES and KIDS
export const TRUE = 'True'
export const FALSE = 'False'

// For TYPES
export const TYPE_PHRASE = 'phrase'
export const TYPE_SONG = 'song'
export const TYPE_STORY = 'story'
export const TYPE_WORD = 'word'
export const TYPE_ENTRY = 'word,phrase,song,story'
export const TYPE_DICTIONARY = 'word,phrase'
export const TYPE_MEDIA = 'audio,image,video'

/* Param Keys Frontend ONLY */
export const CHAR = 'char'
