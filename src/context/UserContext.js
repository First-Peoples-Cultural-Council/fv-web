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

const userDataAdaptor = (data) => {
  const properties = data?.properties || {}
  const { firstName, lastName, username, groups } = properties
  let isAdmin = false

  if (groups?.length > 0) {
    isAdmin = groups.join().includes('administrator')
  }
  return {
    firstName,
    lastName,
    username,
    userInitials:
      firstName || lastName
        ? (firstName?.charAt(0) || '') + (lastName?.charAt(0) || '')
        : username?.charAt(0) || '',
    displayName:
      firstName || lastName
        ? `${firstName || ''} ${lastName || ''}`
        : username || '',
    groups,
    isAdmin: !!(isAdmin || data?.isAdministrator),
    isSuperAdmin: data?.isAdministrator,
    isAnonymous: data?.isAnonymous,
    roles: data?.roles,
  }
}

const [UserProvider, useUserStore, useUserDispatch] = makeStore(
  userReducer,
  userInitialState,
)

export { UserProvider, useUserStore, useUserDispatch }
