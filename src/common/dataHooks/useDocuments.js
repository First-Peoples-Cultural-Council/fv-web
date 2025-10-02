import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

// FPCC
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import api from 'services/api'
import { DOCUMENT_PATH, TYPE_DOCUMENT, MEDIA } from 'common/constants'
import {
  documentForEditing,
  documentForApi,
} from 'common/dataAdaptors/mediaAdaptors'
import { isUUID } from 'common/utils/stringHelpers'

export function useDocument({ id, edit = false }) {
  const { sitename } = useParams()
  const queryResponse = useQuery({
    queryKey: [DOCUMENT_PATH, sitename, id],
    queryFn: () => api.documents.get({ sitename, id }),
    select: (data) => (edit ? documentForEditing({ data: data }) : data),
    enabled: !!isUUID(id),
  })

  return queryResponse
}

export function useDocumentUpdate({ id }) {
  const { sitename } = useParams()
  const updateDocument = async (formData) => {
    const data = documentForApi({ formData })
    api.documents.partialUpdate({
      id,
      data,
      sitename,
    })
  }
  const mutation = useMutationWithNotification({
    mutationFn: updateDocument,
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
