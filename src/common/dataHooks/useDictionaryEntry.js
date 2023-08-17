import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { DICTIONARY, TYPE_DICTIONARY } from 'common/constants'
import api from 'services/api'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'

import {
  entryForEditing,
  entryForViewing,
  entryForApi,
} from 'common/dataAdaptors/dictionaryAdaptors'

export function useDictionaryEntry({ id, edit = false }) {
  const { sitename } = useParams()
  const response = useQuery(
    [DICTIONARY, sitename, id],
    () => api.dictionary.get({ sitename, id }),
    { enabled: !!id },
  )
  const formattedEntry = edit
    ? entryForEditing(response?.data)
    : entryForViewing(response?.data)

  return {
    ...response,
    data: formattedEntry,
  }
}

export function useDictionaryEntryCreate() {
  const { sitename } = useParams()

  const createDictionaryEntry = async (formData) => {
    const properties = entryForApi(formData)
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
    const properties = entryForApi(formData)
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
