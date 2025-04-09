import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import api from 'services/api'
import { IMAGE_PATH, TYPE_IMAGE, MEDIA } from 'common/constants'
import {
  mediaItemForEditing,
  mediaItemForApi,
} from 'common/dataAdaptors/mediaAdaptors'
import { isUUID } from 'common/utils/stringHelpers'

export function useImage({ id, edit = false }) {
  const { sitename } = useParams()
  const response = useQuery({
    queryKey: [IMAGE_PATH, sitename, id],
    queryFn: () => api.images.get({ sitename, id }),
    ...{ enabled: !!isUUID(id) },
  })
  const formattedData = edit
    ? mediaItemForEditing({ data: response?.data })
    : response?.data

  return { ...response, data: formattedData }
}

export function useImageUpdate({ id }) {
  const { sitename } = useParams()
  const updateMediaItem = async (formData) => {
    const data = mediaItemForApi({ formData })
    api.images.partialUpdate({
      id,
      data,
      sitename,
    })
  }
  const mutation = useMutationWithNotification({
    mutationFn: updateMediaItem,
    redirectTo: `/${sitename}/dashboard/${MEDIA}/${IMAGE_PATH}`,
    actionWord: 'updated',
    type: TYPE_IMAGE,
    queryKeyToInvalidate: [IMAGE_PATH, sitename, id],
  })
  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }

  return { ...mutation, onSubmit }
}

export function useImageDelete() {
  const { sitename } = useParams()
  const mutation = useMutationWithNotification({
    mutationFn: async (id) => api.images.delete({ id, sitename }),
    actionWord: 'deleted',
    type: TYPE_IMAGE,
    refresh: true,
  })
  const onSubmit = (id) => {
    mutation.mutate(id)
  }

  return { ...mutation, onSubmit }
}
