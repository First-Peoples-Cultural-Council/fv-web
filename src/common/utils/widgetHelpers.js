// Helper function to generate widgets available
// superAdmin flag is supplied to filter the list
import {
  WIDGET_ALPHABET,
  WIDGET_APPS,
  WIDGET_CONTACT,
  WIDGET_GALLERY,
  WIDGET_IFRAME,
  WIDGET_IMAGE,
  WIDGET_KEYBOARDS,
  WIDGET_LOGO,
  WIDGET_QUOTES,
  WIDGET_STATS,
  WIDGET_TEXT,
  WIDGET_TEXTCONCISE,
  WIDGET_TEXTFULL,
  WIDGET_VIDEO,
  WIDGET_WOTD,
} from 'common/constants'

export const getEditableWidgetsForUser = (isSuperAdmin) =>
  [
    isSuperAdmin && WIDGET_APPS,
    WIDGET_CONTACT,
    WIDGET_GALLERY,
    WIDGET_IFRAME,
    WIDGET_IMAGE,
    isSuperAdmin && WIDGET_KEYBOARDS,
    WIDGET_LOGO,
    WIDGET_QUOTES,
    WIDGET_TEXT,
    WIDGET_TEXTCONCISE,
    WIDGET_TEXTFULL,
    WIDGET_VIDEO,
  ].filter(Boolean)

export const getCreatableWidgetsForUser = (isSuperAdmin) =>
  [
    isSuperAdmin && WIDGET_ALPHABET,
    isSuperAdmin && WIDGET_APPS,
    WIDGET_CONTACT,
    WIDGET_GALLERY,
    WIDGET_IFRAME,
    WIDGET_IMAGE,
    isSuperAdmin && WIDGET_KEYBOARDS,
    WIDGET_LOGO,
    WIDGET_QUOTES,
    isSuperAdmin && WIDGET_STATS,
    WIDGET_TEXT,
    WIDGET_TEXTCONCISE,
    WIDGET_TEXTFULL,
    WIDGET_VIDEO,
    isSuperAdmin && WIDGET_WOTD,
  ].filter(Boolean)

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
    case WIDGET_IMAGE:
      return 'Image'
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
    case WIDGET_VIDEO:
      return 'Video'
    case WIDGET_WOTD:
      return 'Word of the Day'
    default:
      return 'Unrecognised Widget Type'
  }
}

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
