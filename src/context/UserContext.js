import makeStore from 'context/makeStore'
import {
  LANGUAGE_ADMIN,
  EDITOR,
  ASSISTANT,
  atLeastAssistant,
} from 'common/constants'

const anonymousUser = {
  isAnonymous: true,
  userInitials: '',
  displayName: 'Guest',
  isTeam: false,
  isLanguageAdmin: false,
  isSuperAdmin: false,
  roles: [],
}

export const userInitialState = {
  user: anonymousUser,
  isLoading: true,
}

function userReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        user: userDataAdaptor(action.data),
        isLoading: false,
      }
    case 'ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.type]: true,
        },
        isLoading: false,
      }
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      }
    default:
      return state
  }
}

function makeInitials(name) {
  const parts = name?.split(' ')

  if (parts?.length > 1) {
    return `${parts[0]?.charAt(0)}${parts[parts.length - 1]?.charAt(0)}`
  }

  return parts[0]?.charAt(0)
}

function getRoles(memberships) {
  const roles = {}
  memberships?.forEach((m) => {
    roles[m.sitename] = m.role
  })
  return roles
}

const userDataAdaptor = (data) => {
  if (!data?.auth?.isAuthenticated) {
    return anonymousUser
  }

  // authenticated user
  const roles = getRoles(data?.memberships)

  const isLanguageAdmin = Object.values(roles).some((r) => r === LANGUAGE_ADMIN)
  const isTeam =
    isLanguageAdmin ||
    Object.values(roles).some((r) => r === ASSISTANT || r === EDITOR)

  // pull names from standard oidc claims in the user profile
  const userProfile = data?.auth?.user?.profile
  const firstName = userProfile?.given_name || ''
  const lastName = userProfile?.family_name || ''
  const fullName = userProfile?.name || [firstName, lastName].join(' ') || ''
  const displayName =
    userProfile?.nickname ||
    firstName ||
    userProfile?.preferred_username ||
    fullName ||
    userProfile?.email
  const teamMemberSites = data?.memberships?.filter((s) =>
    s?.role.match(atLeastAssistant),
  )

  return {
    isAnonymous: false,
    id: userProfile?.sub,
    displayName,
    fullName,
    userInitials: makeInitials(fullName),
    isLanguageAdmin,
    isTeam,
    isSuperAdmin: false, // until fw-4694
    isStaff: false, // until fw-4694
    roles,
    sites: data?.memberships,
    teamMemberSites,
  }
}

const [UserProvider, useUserStore, useUserDispatch] = makeStore(
  userReducer,
  userInitialState,
)

export { UserProvider, useUserStore, useUserDispatch }
