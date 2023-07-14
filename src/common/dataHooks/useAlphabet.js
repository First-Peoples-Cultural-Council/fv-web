import { useQuery } from '@tanstack/react-query'

// FPCC
import { CHARACTERS } from 'common/constants'
import api from 'services/api'
import { useSiteStore } from 'context/SiteContext'

export default function useAlphabet() {
  const { site } = useSiteStore()
  const response = useQuery(
    [CHARACTERS, site?.sitename],
    () => api.characters.get({ sitename: site?.sitename }),
    { enabled: !!site?.sitename },
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
