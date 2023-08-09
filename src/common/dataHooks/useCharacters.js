import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { CHARACTERS } from 'common/constants'
import api from 'services/api'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import { objectsToIdsAdaptor } from 'common/dataAdaptors/objectsToIdsAdaptor'

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
    relatedDictionaryEntries: response?.data?.relatedDictionaryEntries,
    relatedAudio: response?.data?.relatedAudio,
    relatedVideos: response?.data?.relatedVideos,
    relatedImages: response?.data?.relatedImages,
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
    relatedDictionaryEntries: character?.relatedDictionaryEntries,
    relatedAudio: character?.relatedAudio,
    relatedVideo: character?.relatedVideos?.[0] || null,
    relatedImage: character?.relatedImages?.[0] || null,
    generalNote: character?.note,
  }))
  return {
    ...response,
    data: { ...response.data, characters: formattedResults },
  }
}

export function useCharacterPartialUpdate() {
  const { sitename } = useParams()

  const partialUpdateCharacter = async (formData) => {
    const properties = {
      relatedAudio: formData?.relatedAudio || [],
      relatedImages: formData?.relatedImages || [],
      relatedVideos: formData?.relatedVideos || [],
      note: formData?.generalNote || '',
      relatedDictionaryEntries:
        objectsToIdsAdaptor(formData?.relatedDictionaryEntries) || [],
    }

    return api.characters.partialUpdate({
      id: formData?.id,
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: partialUpdateCharacter,
    redirectTo: `/${sitename}/dashboard/edit/alphabet`,
    queryKeyToInvalidate: [CHARACTERS, sitename],
    actionWord: 'updated',
    type: 'character',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}
