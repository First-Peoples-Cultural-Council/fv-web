// These text values match the labels returned by the API
export const LANGUAGE_ADMIN = 'Language Admin'
export const EDITOR = 'Editor'
export const ASSISTANT = 'Assistant'
export const MEMBER = 'Member'

export const GENERAL = 'General' // Not a backend role; indicates "any role"

export const SUPER_ADMIN = 'Super Admin'
export const STAFF_ADMIN = 'Staff Admin'

// regular expressions for matching roles
export const atLeastMember = new RegExp(
  `^(${[MEMBER, ASSISTANT, EDITOR, LANGUAGE_ADMIN].join('|')})$`,
)
export const atLeastAssistant = new RegExp(
  `^(${[ASSISTANT, EDITOR, LANGUAGE_ADMIN].join('|')})$`,
)
export const atLeastEditor = new RegExp(
  `^(${[EDITOR, LANGUAGE_ADMIN].join('|')})$`,
)
export const atLeastLanguageAdmin = new RegExp(
  `^(${[LANGUAGE_ADMIN].join('|')})$`,
)
