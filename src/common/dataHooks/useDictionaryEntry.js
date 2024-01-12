import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { DICTIONARY, TYPE_DICTIONARY } from 'common/constants'
import api from 'services/api'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import { useUserStore } from 'context/UserContext'
import { ASSISTANT } from 'common/constants/roles'

import {
  entryForEditing,
  entryForViewing,
  entryForApi,
} from 'common/dataAdaptors/dictionaryAdaptors'

export function useDictionaryEntry({ id, sitename, edit = false }) {
  const { paramsSitename } = useParams()
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

  const { user } = useUserStore()
  const userRoles = user?.roles || {}
  const userSiteRole = userRoles?.[sitename] || ''
  const isAssistant = userSiteRole === ASSISTANT

  const mutation = useMutationWithNotification({
    mutationFn: createDictionaryEntry,
    redirectTo: isAssistant // Redirect to the create page for assistants to be removed when assistants can access the edit pages (FW-4828)
      ? `/${sitename}/dashboard/create/`
      : `/${sitename}/dashboard/edit/entries?types=${TYPE_DICTIONARY}`,
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
