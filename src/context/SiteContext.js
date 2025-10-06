import makeStore from 'context/makeStore'

export const siteInitialState = {
  site: {
    path: '',
    id: '',
    roles: [],
    checkForEnabledFeature: () => {},
    menu: {},
    title: '',
    sitename: '',
    language: '',
    bannerImage: null,
    bannerVideo: null,
    joinText: null,
    visibility: '',
    visibilityOptions: [],
    features: [],
  },
}

function siteReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        site: action.data,
      }
    case 'ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.type]: true,
        },
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

const [SiteProvider, useSiteStore, useSiteDispatch] = makeStore(
  siteReducer,
  siteInitialState,
)

export { SiteProvider, useSiteStore, useSiteDispatch }
