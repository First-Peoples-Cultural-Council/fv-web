import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router'

// FPCC
import { DICTIONARY, TYPE_DICTIONARY } from 'common/constants'
import api from 'services/api'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import { getDictionaryEntryUrl } from 'common/utils/urlHelpers'
import { isUUID } from 'common/utils/stringHelpers'
import {
  entryForEditing,
  entryForViewing,
  entryForApi,
} from 'common/dataAdaptors/dictionaryAdaptors'

export function useDictionaryEntry({ id, sitename, edit = false }) {
  const { sitename: paramsSitename } = useParams()
  const sitenameToSend = sitename || paramsSitename

  const response = useQuery({
    queryKey: [DICTIONARY, sitenameToSend, id],
    queryFn: () => api.dictionary.get({ sitename: sitenameToSend, id }),
    select: (data) =>
      edit ? entryForEditing({ item: data }) : entryForViewing({ item: data }),
    enabled: !!isUUID(id),
  })

  return response
}

const getRedirectFromResponse = ({ response, navigate }) => {
  const urlToUse = getDictionaryEntryUrl({
    sitename: response?.site?.slug,
    type: response?.type,
    id: response?.id,
  })
  setTimeout(() => {
    navigate(urlToUse)
  }, 1000)
}

export function useDictionaryEntryCreate() {
  const { sitename } = useParams()
  const navigate = useNavigate()

  const createDictionaryEntry = async (formData) => {
    const properties = entryForApi({ formData })
    return api.dictionary.create({
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: createDictionaryEntry,
    onSuccessCallback: (response) =>
      getRedirectFromResponse({ response, navigate }),
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
  const navigate = useNavigate()

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
    onSuccessCallback: (response) =>
      getRedirectFromResponse({ response, navigate }),
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
