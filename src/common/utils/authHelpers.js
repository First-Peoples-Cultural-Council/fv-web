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
} from 'common/constants/roles'

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
