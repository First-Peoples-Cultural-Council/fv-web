import { useQuery } from '@tanstack/react-query'

// FPCC
import { PARTS_OF_SPEECH } from 'common/constants'
import api from 'services/api'

export function usePartsOfSpeech() {
  const response = useQuery({
    queryKey: [PARTS_OF_SPEECH],
    queryFn: () => api.partsOfSpeech.get(),
  })
  const formattedData = response?.data?.results
    ? response?.data.results?.map((entry) => ({
        label: entry?.title,
        value: entry?.id,
      }))
    : []
  return { ...response, data: formattedData }
}
