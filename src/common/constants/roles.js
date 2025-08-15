// These text values match the labels returned by the API
export const LANGUAGE_ADMIN = 'Language Admin'
export const EDITOR = 'Editor'
export const ASSISTANT = 'Assistant'
export const MEMBER = 'Member'

// These text values match the names returned by the memberships API
export const LANGUAGE_ADMIN_ENUM_NAME = 'language_admin'
export const EDITOR_ENUM_NAME = 'editor'
export const ASSISTANT_ENUM_NAME = 'assistant'
export const MEMBER_ENUM_NAME = 'member'

export const GENERAL = 'General' // Not a backend role; indicates "any role"

export const SUPER_ADMIN = 'Super Admin'
export const STAFF_ADMIN = 'Staff Admin'

// regular expressions for matching roles
export const atLeastMember = new RegExp(
  `^(${[
    MEMBER,
    ASSISTANT,
    EDITOR,
    LANGUAGE_ADMIN,
    SUPER_ADMIN,
    STAFF_ADMIN,
  ].join('|')})$`,
)
export const atLeastAssistant = new RegExp(
  `^(${[ASSISTANT, EDITOR, LANGUAGE_ADMIN, SUPER_ADMIN, STAFF_ADMIN].join(
    '|',
  )})$`,
)
export const atLeastEditor = new RegExp(
  `^(${[EDITOR, LANGUAGE_ADMIN, SUPER_ADMIN, STAFF_ADMIN].join('|')})$`,
)
export const atLeastLanguageAdmin = new RegExp(
  `^(${[LANGUAGE_ADMIN, SUPER_ADMIN, STAFF_ADMIN].join('|')})$`,
)
export const atLeastStaff = new RegExp(
  `^(${[SUPER_ADMIN, STAFF_ADMIN].join('|')})$`,
)
