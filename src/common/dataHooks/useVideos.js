import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import api from 'services/api'
import { VIDEO_PATH, TYPE_VIDEO, MEDIA } from 'common/constants'
import {
  mediaItemForEditing,
  mediaItemForApi,
} from 'common/dataAdaptors/mediaAdaptors'

export function useVideo({ id, edit = false }) {
  const { sitename } = useParams()
  const response = useQuery({
    queryKey: [VIDEO_PATH, sitename, id],
    queryFn: () => api.videos.get({ sitename, id }),
    ...{ enabled: !!id },
  })
  const formattedData = edit
    ? mediaItemForEditing({ data: response?.data })
    : response?.data

  return { ...response, data: formattedData }
}

export function useVideoUpdate({ id }) {
  const { sitename } = useParams()
  const updateMediaItem = async (formData) => {
    const data = mediaItemForApi({ formData })
    api.videos.partialUpdate({
      id,
      data,
      sitename,
    })
  }
  const mutation = useMutationWithNotification({
    mutationFn: updateMediaItem,
    redirectTo: `/${sitename}/dashboard/${MEDIA}/${VIDEO_PATH}`,
    actionWord: 'updated',
    type: TYPE_VIDEO,
    queryKeyToInvalidate: [VIDEO_PATH, sitename, id],
  })
  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }

  return { ...mutation, onSubmit }
}

export function useVideoDelete() {
  const { sitename } = useParams()
  const mutation = useMutationWithNotification({
    mutationFn: async (id) => api.videos.delete({ id, sitename }),
    actionWord: 'deleted',
    type: TYPE_VIDEO,
    refresh: true,
  })
  const onSubmit = (id) => {
    mutation.mutate(id)
  }

  return { ...mutation, onSubmit }
}
