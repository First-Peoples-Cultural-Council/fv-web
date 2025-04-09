import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import api from 'services/api'
import { VIDEO_PATH, TYPE_VIDEO, MEDIA } from 'common/constants'
import { videoForEditing, videoForApi } from 'common/dataAdaptors/mediaAdaptors'
import { isUUID } from 'common/utils/stringHelpers'

export function useVideo({ id, edit = false }) {
  const { sitename } = useParams()
  const response = useQuery({
    queryKey: [VIDEO_PATH, sitename, id],
    queryFn: () => api.videos.get({ sitename, id }),
    ...{ enabled: !!isUUID(id) },
  })
  const formattedData = edit
    ? videoForEditing({ data: response?.data })
    : response?.data

  return { ...response, data: formattedData }
}

export function useVideoUpdate({ id }) {
  const { sitename } = useParams()
  const updateMediaItem = async (formData) => {
    const data = videoForApi({ formData })
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
