import { useQuery } from '@tanstack/react-query'

// FPCC
import { LANGUAGES } from 'common/constants'
import api from 'services/api'
import { languagesListAdaptor } from 'common/dataAdaptors'

export function useLanguage({ id }) {
  const response = useQuery({
    queryKey: [LANGUAGES, id],
    queryFn: () => api.languages.get({ id }),
    ...{ enabled: !!id },
  })

  return { ...response }
}

export function useLanguages({ query, explorable }) {
  const allLanguagesResponse = useQuery({
    queryKey: [LANGUAGES, query, explorable],
    queryFn: () => api.languages.getAll({ query, explorable }),
  })
  const formattedLanguagesData = languagesListAdaptor({
    languagesData: allLanguagesResponse?.data,
  })

  return {
    ...allLanguagesResponse,
    languagesData: formattedLanguagesData,
  }
}
