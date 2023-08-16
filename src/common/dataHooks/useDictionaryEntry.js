import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { DICTIONARY, TYPE_DICTIONARY } from 'common/constants'
import api from 'services/api'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'

export function useDictionaryEntry({ id }) {
  const { sitename } = useParams()
  const response = useQuery([DICTIONARY, sitename, id], () =>
    api.dictionary.get({ sitename, id }),
  )
  const formattedEntry = {
    id: response?.data?.id || '',
    type: response?.data?.type?.toLowerCase() || '',
    title: response?.data?.title,
    translations: response?.data?.translations || [],
    categories: response?.data?.categories || [],
    relatedEntries: response?.data?.relatedEntries || [],
    relatedAudio: response?.data?.relatedAudio || [],
    relatedImages: response?.data?.relatedImages || [],
    relatedVideos: response?.data?.relatedVideos || [],
    acknowledgements: response?.data?.acknowledgements || [],
    alternateSpellings: response?.data?.alternateSpellings || [],
    pronunciations: response?.data?.pronunciations || [],
    notes: response?.data?.notes || [],
    visibility: response?.data?.visibility || 'Public',
    excludeFromKids: response?.data?.excludeFromKids,
    excludeFromGames: response?.data?.excludeFromGames,
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
    related_audio: data?.audio || [],
    related_images: data?.images || [],
    related_videos: data?.videos || [],
    title: data?.title || '',
    type: data?.type || 'WORD',
    visibility: data?.visibility || 'Public',
    categories: data?.categories || [],
    acknowledgements: data?.acknowledgements || [],
    alternate_spellings: data?.alternateSpellings || [],
    notes: data?.notes || [],
    translations: data?.translations || [],
    pronunciations: data?.pronunciations || [],
    exclude_from_games: data?.excludeFromGames || 'False',
    exclude_from_kids: data?.excludeFromKids || 'False',
    related_dictionary_entries: data?.relatedEntries || [],
  }
  return formattedData
}
