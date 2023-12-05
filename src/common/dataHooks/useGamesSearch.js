import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import api from 'services/api'
import SEARCH from 'common/constants'

export function useParachuteSearch({ searchParams, perPage }) {
  const { sitename } = useParams()
  const searchParamString = searchParams.toString()
  const { data, refetch } = useQuery(
    [SEARCH, sitename, searchParams],
    () =>
      api.search.getParachute({
        sitename,
        searchParams: searchParamString,
        perPage,
      }),
    {
      enabled: !!sitename,
    },
  )
  return {
    data,
    refetch,
  }
}
