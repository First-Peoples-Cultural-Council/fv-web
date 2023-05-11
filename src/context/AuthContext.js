import makeStore from 'context/makeStore'

export const authInitialState = {
  auth: {
    accessToken: '',
    refreshToken: '',
  },
  isLoading: true,
}

function authReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        auth: action.data,
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

const [AuthProvider, useAuthStore, useAuthDispatch] = makeStore(
  authReducer,
  authInitialState,
)

export { AuthProvider, useAuthStore, useAuthDispatch }
