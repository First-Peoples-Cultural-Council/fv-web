import { useQuery } from '@tanstack/react-query'

// FPCC
import { DICTIONARY } from 'common/constants'
import api from 'services/api'

export default function useDictionaryEntry({ sitename, id }) {
  const response = useQuery([DICTIONARY, sitename, id], () =>
    api.dictionaryEntry.get({ sitename, id }),
  )
  const formattedEntry = {
    id: response?.data?.id || '',
    type: response?.data?.type?.toLowerCase() || '',
    title: response?.data?.title,
    translations: response?.data?.translations || [],
    pronunciations: response?.data?.pronunciations || [],
    categories: response?.data?.categories || [],
    relatedAssets: response?.data?.relatedEntries || [],
    audio: response?.data?.relatedAudio || [],
    images: response?.data?.relatedImages || [],
    videos: response?.data?.relatedVideos || [],
    acknowledgements: response?.data?.acknowledgements || [],
    notes: response?.data?.notes || [],
    visibility: response?.data?.visibility,
    kidFriendly: !response?.data?.excludeFromKids,
  }
  return {
    ...response,
    data: formattedEntry,
  }
}
