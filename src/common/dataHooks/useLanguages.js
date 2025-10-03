import { useQuery } from '@tanstack/react-query'

// FPCC
import { LANGUAGES } from 'common/constants'
import api from 'services/api'
import { languagesListAdaptor } from 'common/dataAdaptors'

export function useLanguage({ id }) {
  const queryResponse = useQuery({
    queryKey: [LANGUAGES, id],
    queryFn: () => api.languages.get({ id }),
    enabled: !!id,
  })

  return queryResponse
}

export function useLanguages({ query, explorable }) {
  const queryResponse = useQuery({
    queryKey: [LANGUAGES, query, explorable],
    queryFn: () => api.languages.getAll({ query, explorable }),
    select: (data) => ({
      ...data,
      results: languagesListAdaptor({ languagesData: data }),
    }),
  })

  return queryResponse
}
