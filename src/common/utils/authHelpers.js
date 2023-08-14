import { User } from 'oidc-client-ts'

// FPCC
import GlobalConfiguration from 'src/GlobalConfiguration'

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

  if (user != null) {
    return {
      Authorization: `Bearer ${user.access_token}`,
    }
  }

  return {}
}
