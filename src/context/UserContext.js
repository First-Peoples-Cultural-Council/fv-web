import makeStore from 'context/makeStore'

export const userInitialState = {
  user: {
    firstName: 'Guest',
    lastName: 'User',
    username: 'Guest',
    userInitials: 'GU',
    displayName: 'Guest User',
    groups: [],
    roles: {},
  },
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
    return `${parts[0]?.charAt(0)} ${parts[parts.length - 1]?.charAt(0)}`
  }

  return parts[0]?.charAt(0)
}

const userDataAdaptor = (data) => {
  if (!data.profile) {
    // anonymous user
    return {
      isAnonymous: true,
      userInitials: '',
      displayName: 'Guest',
      groups: [],
      isAdmin: false,
      isSuperAdmin: false,
      roles: [],
    }
  }

  // authenticated user
  const isAdmin = false

  const formatted = {
    isAnonymous: false,
    id: data?.profile?.sub,
    displayName: data?.profile?.name || '',
    firstName: data?.profile?.name?.split(' ').shift(),
    userInitials: makeInitials(data?.profile?.name),
    groups: [],
    isAdmin: !!(isAdmin || data?.isAdministrator),
    isSuperAdmin: data?.isAdministrator,
    roles: data?.roles,
  }

  return formatted
}

const [UserProvider, useUserStore, useUserDispatch] = makeStore(
  userReducer,
  userInitialState,
)

export { UserProvider, useUserStore, useUserDispatch }
