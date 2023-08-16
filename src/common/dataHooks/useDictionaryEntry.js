import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { DICTIONARY, TYPE_DICTIONARY } from 'common/constants'
import api from 'services/api'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import { objectsToIdsAdaptor } from 'common/dataAdaptors/objectsToIdsAdaptor'

export function useDictionaryEntry({ id }) {
  const { sitename } = useParams()
  const response = useQuery([DICTIONARY, sitename, id], () =>
    api.dictionary.get({ sitename, id }),
  )
  const formattedEntry = {
    id: response?.data?.id || '',
    acknowledgements: response?.data?.acknowledgements || [],
    alternateSpellings: response?.data?.alternateSpellings || [],
    categories: response?.data?.categories || [],
    excludeFromGames: response?.data?.excludeFromGames || false,
    excludeFromKids: response?.data?.excludeFromKids || false,
    notes: response?.data?.notes || [],
    partOfSpeech: response?.data?.partOfSpeech || '',
    pronunciations: response?.data?.pronunciations || [],
    relatedEntries: response?.data?.relatedEntries || [],
    relatedAudio: response?.data?.relatedAudio || [],
    relatedImages: response?.data?.relatedImages || [],
    relatedVideos: response?.data?.relatedVideos || [],
    title: response?.data?.title,
    translations: response?.data?.translations || [],
    type: response?.data?.type?.toLowerCase() || '',
    visibility: response?.data?.visibility || 'Public',
  }
  return {
    ...response,
    data: formattedEntry,
  }
}

export function useDictionaryEntryCreate() {
  const { sitename } = useParams()

  const createDictionaryEntry = async (formData) => {
    const properties = dictionaryEntryAdaptor(formData)
    return api.dictionary.create({
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: createDictionaryEntry,
    redirectTo: `/${sitename}/dashboard/edit/entries?types=${TYPE_DICTIONARY}`,
    queryKeyToInvalidate: [DICTIONARY, sitename],
    actionWord: 'created',
    type: 'dictionary entry',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}

export function useDictionaryEntryUpdate() {
  const { sitename } = useParams()

  const updateDictionaryEntry = async (formData) => {
    const properties = dictionaryEntryAdaptor(formData)
    return api.dictionary.update({
      id: formData?.id,
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updateDictionaryEntry,
    redirectTo: `/${sitename}/dashboard/edit/entries?types=${TYPE_DICTIONARY}`,
    queryKeyToInvalidate: [DICTIONARY, sitename],
    actionWord: 'updated',
    type: 'dictionary entry',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}

export function useDictionaryEntryDelete() {
  const { sitename } = useParams()
  const deleteDictionaryEntry = async (id) =>
    api.dictionary.delete({
      id,
      sitename,
    })

  const mutation = useMutationWithNotification({
    mutationFn: deleteDictionaryEntry,
    redirectTo: `/${sitename}/dashboard/edit/entries?types=${TYPE_DICTIONARY}`,
    queryKeyToInvalidate: [DICTIONARY, sitename],
    actionWord: 'deleted',
    type: 'dictionary entry',
  })
  const onSubmit = (id) => {
    mutation.mutate(id)
  }
  return { onSubmit }
}

// for sending to APIs
const dictionaryEntryAdaptor = (data) => {
  const formattedData = {
    title: data?.title || '',
    type: data?.type || 'word',
    visibility: data?.visibility || 'public',
    categories: objectsToIdsAdaptor(data?.categories) || [],
    acknowledgements: data?.acknowledgements || [],
    alternate_spellings: data?.alternateSpellings || [],
    notes: data?.notes || [],
    translations: data?.translations || [],
    part_of_speech: data?.partOfSpeech || '',
    pronunciations: data?.pronunciations || [],
    exclude_from_games: data?.excludeFromGames || false,
    exclude_from_kids: data?.excludeFromKids || false,
    related_audio: data?.audio || [],
    related_images: data?.images || [],
    related_videos: data?.videos || [],
    related_dictionary_entries: objectsToIdsAdaptor(data?.relatedEntries) || [],
  }
  return formattedData
}
