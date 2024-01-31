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

export function useDictionaryEntry({ id, sitename, edit = false }) {
  const { sitename: paramsSitename } = useParams()
  const sitenameToSend = sitename || paramsSitename

  const response = useQuery(
    [DICTIONARY, sitenameToSend, id],
    () => api.dictionary.get({ sitename: sitenameToSend, id }),
    { enabled: !!id },
  )
  const formattedEntry = edit
    ? entryForEditing({ item: response?.data })
    : entryForViewing({ item: response?.data })

  return {
    ...response,
    data: formattedEntry,
  }
}

export function useDictionaryEntryCreate() {
  const { sitename } = useParams()

  const createDictionaryEntry = async (formData) => {
    const properties = entryForApi({ formData })
    return api.dictionary.create({
      sitename,
      properties,
    })
  }

  const getPathType = (type) => (type === 'phrase' ? 'phrases' : 'words')

  const getRedirectFromResponse = (response) =>
    `/${sitename}/${getPathType(response?.type)}/${response?.id}`

  const mutation = useMutationWithNotification({
    mutationFn: createDictionaryEntry,
    responseRedirectFn: getRedirectFromResponse,
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
    const properties = entryForApi({ formData })
    return api.dictionary.update({
      id: formData?.id,
      sitename,
      properties,
    })
  }

  const getPathType = (type) => (type === 'phrase' ? 'phrases' : 'words')

  const getRedirectFromResponse = (response) =>
    `/${sitename}/${getPathType(response?.type)}/${response?.id}`

  const mutation = useMutationWithNotification({
    mutationFn: updateDictionaryEntry,
    responseRedirectFn: getRedirectFromResponse,
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
