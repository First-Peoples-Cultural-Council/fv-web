import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import api from 'services/api'
import { DOCUMENT_PATH, TYPE_DOCUMENT, MEDIA } from 'common/constants'
import {
  mediaItemForEditing,
  mediaItemForApi,
} from 'common/dataAdaptors/mediaAdaptors'
import { isUUID } from 'common/utils/stringHelpers'

export function useDocument({ id, edit = false }) {
  const { sitename } = useParams()
  const response = useQuery({
    queryKey: [DOCUMENT_PATH, sitename, id],
    queryFn: () => api.documents.get({ sitename, id }),
    ...{ enabled: !!isUUID(id) },
  })
  const formattedData = edit
    ? mediaItemForEditing({ data: response?.data })
    : response?.data

  return { ...response, data: formattedData }
}

export function useDocumentUpdate({ id }) {
  const { sitename } = useParams()
  const updateMediaItem = async (formData) => {
    const data = mediaItemForApi({ formData })
    api.documents.partialUpdate({
      id,
      data,
      sitename,
    })
  }
  const mutation = useMutationWithNotification({
    mutationFn: updateMediaItem,
    redirectTo: `/${sitename}/dashboard/${MEDIA}/${DOCUMENT_PATH}`,
    actionWord: 'updated',
    type: TYPE_DOCUMENT,
    queryKeyToInvalidate: [DOCUMENT_PATH, sitename, id],
  })
  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }

  return { ...mutation, onSubmit }
}

export function useDocumentDelete() {
  const { sitename } = useParams()
  const mutation = useMutationWithNotification({
    mutationFn: async (id) => api.documents.delete({ id, sitename }),
    actionWord: 'deleted',
    type: TYPE_DOCUMENT,
    refresh: true,
  })
  const onSubmit = (id) => {
    mutation.mutate(id)
  }

  return { ...mutation, onSubmit }
}
