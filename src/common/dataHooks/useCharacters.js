import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { CHARACTERS } from 'common/constants'
import api from 'services/api'

export function useCharacter({ id }) {
  const { sitename } = useParams()
  const response = useQuery(
    [CHARACTERS, sitename],
    () => api.characters.get({ sitename, id }),
    { enabled: !!id },
  )
  const formattedData = {
    id: response?.data?.id,
    title: response?.data?.title,
    relatedWords: response?.data?.relatedEntries,
    relatedAudio: response?.data?.relatedAudio,
    relatedVideo: response?.data?.relatedVideos?.[0] || null,
    relatedPictures: response?.data?.relatedImages,
    generalNote: response?.data?.note,
  }
  return {
    ...response,
    data: formattedData,
  }
}

export function useCharacters() {
  const { sitename } = useParams()
  const response = useQuery(
    [CHARACTERS, sitename],
    () => api.characters.getAll({ sitename }),
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
