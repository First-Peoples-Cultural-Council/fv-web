import makeStore from 'context/makeStore'

export const siteInitialState = {
  site: {
    path: '',
    id: '',
    roles: [],
    checkForEnabledFeature: () => {},
    children: {},
    menu: {},
    title: '',
    sitename: '',
    parentLanguageTitle: '',
    topBackgroundImageId: '',
    topBackgroundVideoId: '',
    joinText: null,
    visibility: '',
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
