import { useQuery, useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import { MEDIA } from 'common/constants'
import {
  mediaItemForEditing,
  mediaItemForApi,
} from 'common/dataAdaptors/mediaAdaptors'
import { getPathForMediaType } from 'common/utils/mediaHelpers'
import api from 'services/api'

export function useMediaObject({ id, mediaType, edit = false }) {
  // General function to fetch details of all media types
  const { sitename } = useParams()

  const response = useQuery({
    queryKey: [mediaType, sitename, id],
    queryFn: () => api.media.get({ sitename, id, mediaType }),
    ...{ enabled: !!id },
  })

  const formattedData = edit
    ? mediaItemForEditing({ data: response?.data })
    : response?.data

  return {
    ...response,
    data: formattedData,
  }
}

export function useAudioCreate(options = {}) {
  const { sitename } = useParams()
  const createJoinRequest = async (formData) => {
    // Audience flags
    const excludeFromGames = formData?.includeInGames === 'false'
    const excludeFromKids = formData?.includeInKids === 'false'

    const data = new FormData()
    data.append('title', formData?.title)
    data.append('description', formData?.description)
    data.append('acknowledgement', formData?.acknowledgement)
    data.append('excludeFromGames', excludeFromGames)
    data.append('excludeFromKids', excludeFromKids)
    data.append('isShared', formData?.isShared)
    data.append('original', formData?.audioFile?.[0])

    formData?.speakers.forEach((speaker) => {
      data.append('speakers', speaker)
    })

    return api.media.uploadAudio({
      sitename,
      data,
    })
  }

  const mutation = useMutation({
    mutationFn: createJoinRequest,
    ...options,
  })

  return mutation
}

export function useMediaDelete({ mediaType }) {
  const { sitename } = useParams()

  const deleteMediaFile = async (id) =>
    api.media.delete({
      id,
      sitename,
      mediaType,
    })
  const mutation = useMutationWithNotification({
    mutationFn: deleteMediaFile,
    actionWord: 'deleted',
    type: mediaType,
    refresh: true,
  })
  const onSubmit = (id) => {
    mutation.mutate(id)
  }
  return { onSubmit }
}

export function useMediaUpdate({ mediaType, id }) {
  const { sitename } = useParams()
  const mediaTypePath = getPathForMediaType(mediaType)

  const updateMediaItem = async (formData) => {
    const data = mediaItemForApi({ formData })
    api.media.update({
      id,
      data,
      mediaType,
      sitename,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updateMediaItem,
    redirectTo: `/${sitename}/dashboard/${MEDIA}/${mediaTypePath}`,
    actionWord: 'updated',
    type: 'media item',
    queryKeyToInvalidate: [mediaType, sitename, id],
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}
