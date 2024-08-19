import { User } from 'oidc-client-ts'

// FPCC
import GlobalConfiguration from 'src/GlobalConfiguration'
import {
  SUPER_ADMIN,
  STAFF_ADMIN,
  LANGUAGE_ADMIN,
  EDITOR,
  ASSISTANT,
  MEMBER,
  atLeastMember,
  atLeastAssistant,
  atLeastEditor,
  atLeastLanguageAdmin,
  atLeastStaff,
  TYPE_PHRASE,
  TYPE_SONG,
  TYPE_STORY,
  TYPE_WORD,
  TYPE_AUDIO,
  TYPE_IMAGE,
  TYPE_VIDEO,
  TEAM,
} from 'common/constants'

function getUser() {
  // Retrieves user tokens directly from local storage.
  // This avoids useAuth, so it can be used outside hooks and components.
  // The storage key name is created by oidc-client-ts and documented here:
  // https://github.com/authts/react-oidc-context#call-a-protected-api
  const oidcStorage = localStorage.getItem(
    `oidc.user:${GlobalConfiguration.OIDC_AUTHORITY_URL}:${GlobalConfiguration.AWS_CLIENT_ID}`,
  )
  if (!oidcStorage) {
    return null
  }

  return User.fromStorageString(oidcStorage)
}

export const getAuthHeaderIfTokenExists = () => {
  const user = getUser()

  if (user != null && !user?.expired) {
    return {
      Authorization: `Bearer ${user.access_token}`,
    }
  }

  return {}
}

export const isAuthorized = ({
  requiredMembershipRole,
  userMembershipRole,
}) => {
  switch (requiredMembershipRole) {
    case MEMBER:
      if (userMembershipRole.match(atLeastMember)) {
        return true
      }
      return false
    case ASSISTANT:
      if (userMembershipRole.match(atLeastAssistant)) {
        return true
      }
      return false
    case EDITOR:
      if (userMembershipRole.match(atLeastEditor)) {
        return true
      }
      return false
    case LANGUAGE_ADMIN:
      if (userMembershipRole.match(atLeastLanguageAdmin)) {
        return true
      }
      return false
    case SUPER_ADMIN:
    case STAFF_ADMIN:
      if (userMembershipRole.match(atLeastStaff)) {
        return true
      }
      return false
    default:
      return false
  }
}

export const userCanEdit = ({ type, visibility, userMembershipRole }) => {
  switch (type) {
    case TYPE_PHRASE:
    case TYPE_SONG:
    case TYPE_STORY:
    case TYPE_WORD:
    case TYPE_AUDIO:
    case TYPE_IMAGE:
    case TYPE_VIDEO:
      if (userMembershipRole.match(atLeastAssistant) && visibility === TEAM) {
        return true
      }
      if (userMembershipRole.match(atLeastEditor)) {
        return true
      }
      return false
    default:
      return false
  }
}
