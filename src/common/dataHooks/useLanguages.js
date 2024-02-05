import { useQuery } from '@tanstack/react-query'

// FPCC
import { LANGUAGES } from 'common/constants'
import api from 'services/api'
import { languagesListAdaptor } from 'common/dataAdaptors'

export function useLanguage({ id }) {
  const response = useQuery([LANGUAGES, id], () => api.languages.get({ id }), {
    // The query will not execute until the id exists
    enabled: !!id,
  })

  return { ...response }
}

export function useLanguages({ query }) {
  const allLanguagesResponse = useQuery([LANGUAGES, query], () =>
    api.languages.getAll({ query }),
  )
  const formattedLanguagesData = languagesListAdaptor({
    languagesData: allLanguagesResponse?.data,
  })

  return {
    ...allLanguagesResponse,
    languagesData: formattedLanguagesData,
  }
}
