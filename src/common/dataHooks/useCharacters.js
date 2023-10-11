import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { CHARACTERS } from 'common/constants'
import api from 'services/api'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import { objectsToIdsAdaptor } from 'common/dataAdaptors/objectsToIdsAdaptor'
import {
  relatedMediaForApi,
  relatedMediaForViewing,
  relatedMediaForEditing,
} from 'common/dataAdaptors/relatedMediaAdaptors'

export function useCharacter({ id, edit = false }) {
  const { sitename } = useParams()
  const response = useQuery(
    [CHARACTERS, sitename],
    () => api.characters.get({ sitename, id }),
    { enabled: !!id },
  )
  const relatedMedia = edit
    ? relatedMediaForEditing({ item: response?.data })
    : relatedMediaForViewing({ item: response?.data })

  const formattedData = {
    id: response?.data?.id,
    title: response?.data?.title,
    relatedDictionaryEntries: response?.data?.relatedDictionaryEntries,
    generalNote: response?.data?.note,
    ...relatedMedia,
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
      ...relatedMediaForApi({ item: formData }),
      note: formData?.generalNote || '',
      related_dictionary_entries: objectsToIdsAdaptor(
        formData?.relatedDictionaryEntries,
      ),
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
