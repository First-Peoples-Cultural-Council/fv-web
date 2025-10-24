export const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
export const FIRSTVOICESLINK = 'firstvoices.com'
export const NOTIFICATION_TIME = 4000
export const DISPLAYABLE_PROPS_MEDIA = [
  'filename',
  'title',
  'mimeType',
  'acknowledgement',
  'description',
  'dimensions',
  'speakers',
  'created',
]
export const ABOUT_LINK =
  'https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/1704813/About+FirstVoices'
export const SUPPORT_LINK =
  'https://firstvoices.atlassian.net/servicedesk/customer/portals'

// the key for storing a post-login redirect location
export const ORIGINAL_DESTINATION = 'original_destination'

// key for destination param used for indicating intended destination for a created item e.g. widget
export const DESTINATION = 'destination'
// key for id param used for adding created item to a destination
export const ID_TO_ADD = 'idToAdd'
// the value for identifying page as the site home page
export const HOME = 'isHomePage'
