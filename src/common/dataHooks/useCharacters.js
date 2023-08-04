import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { CHARACTERS } from 'common/constants'
import api from 'services/api'

export function useCharacters() {
  const { sitename } = useParams()
  const response = useQuery(
    [CHARACTERS, sitename],
    () => api.characters.get({ sitename }),
    { enabled: !!sitename },
  )
  const formattedResults = response?.data?.results?.map((character) => ({
    id: character?.id,
    title: character?.title,
    relatedWords: character?.relatedEntries,
    relatedAudio: character?.relatedAudio,
    relatedVideo: character?.relatedVideos?.[0] || null,
    relatedPictures: character?.relatedImages,
    generalNote: character?.note,
  }))
  return {
    ...response,
    data: { ...response.data, characters: formattedResults },
  }
}
