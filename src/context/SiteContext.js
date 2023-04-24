import makeStore from 'context/makeStore'
import { PUBLIC, MEMBERS, TEAM } from 'common/constants'

export const siteInitialState = {
  site: {
    children: {},
    features: [],
    groups: [],
    hasContactUs: false,
    joinText: null,
    logoId: '',
    menu: {},
    parentLanguageTitle: null,
    path: '',
    roles: [],
    title: '',
    topBackgroundImageId: '',
    topBackgroundVideoId: null,
    uid: '',
  },
}

function siteReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        site: siteDataAdaptor(action.data),
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

const siteDataAdaptor = (data) => {
  const siteVisibility = data?.visibility
  const formattedVisibilityOptions = (optionsArray) =>
    optionsArray.map((option) => ({
      icon: option,
      value: option,
      transKey: `visibility.${option}`,
    }))
  switch (siteVisibility) {
    case PUBLIC:
      return {
        ...data,
        visibilityOptions: formattedVisibilityOptions([TEAM, MEMBERS, PUBLIC]),
      }
    case MEMBERS:
      return {
        ...data,
        visibilityOptions: formattedVisibilityOptions([TEAM, MEMBERS]),
      }
    case TEAM:
    default:
      return { ...data, visibilityOptions: formattedVisibilityOptions([TEAM]) }
  }
}

const [SiteProvider, useSiteStore, useSiteDispatch] = makeStore(
  siteReducer,
  siteInitialState,
)

export { SiteProvider, useSiteStore, useSiteDispatch }
