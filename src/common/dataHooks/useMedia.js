import { useQuery, useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import {
  AUDIO,
  AUDIO_PATH,
  IMAGE,
  IMAGE_PATH,
  VIDEO,
  VIDEO_PATH,
  MEDIA,
} from 'common/constants'
import {
  mediaItemForEditing,
  mediaItemForApi,
} from 'common/dataAdaptors/mediaAdaptors'
import { getPathForMediaType } from 'common/utils/mediaHelpers'
import api from 'services/api'

const MEDIA_APIS = {
  [AUDIO]: api.media.getAudio,
  [IMAGE]: api.media.getImage,
  [VIDEO]: api.media.getVideo,
}

const MEDIA_DELETE_APIS = {
  [AUDIO]: api.media.deleteAudio,
  [IMAGE]: api.media.deleteImage,
  [VIDEO]: api.media.deleteVideo,
}

const MEDIA_UPDATE_APIS = {
  [AUDIO]: api.media.updateAudio,
  [IMAGE]: api.media.updateImage,
  [VIDEO]: api.media.updateVideo,
}

export function useAudioObject({ id }) {
  const { sitename } = useParams()
  const response = useQuery({
    queryKey: [AUDIO_PATH, sitename, id],
    queryFn: () => api.media.getAudio({ sitename, id }),
    ...{ enabled: !!id },
  })
  return response?.data
}

export function useImageObject({ id }) {
  const { sitename } = useParams()
  const response = useQuery({
    queryKey: [IMAGE_PATH, sitename, id],
    queryFn: () => api.media.getImage({ sitename, id }),
    ...{ enabled: !!id },
  })
  return response?.data
}

export function useVideoObject({ id }) {
  const { sitename } = useParams()
  const response = useQuery({
    queryKey: [VIDEO_PATH, sitename, id],
    queryFn: () => api.media.getVideo({ sitename, id }),
    ...{ enabled: !!id },
  })
  return response?.data
}

export function useMediaObject({ id, mediaType }) {
  // General function to fetch details of all media types
  const { sitename } = useParams()
  const mediaPath = getPathForMediaType(mediaType)
  const mediaApi = MEDIA_APIS[mediaType]

  const response = useQuery({
    queryKey: [mediaPath, sitename, id],
    queryFn: () => mediaApi({ sitename, id }),
    ...{ enabled: !!id },
  })

  const formattedData = mediaItemForEditing({ data: response?.data })

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
  const deleteMediaApi = MEDIA_DELETE_APIS[mediaType]

  const deleteMediaFile = async (id) =>
    deleteMediaApi({
      id,
      sitename,
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
  const updateMediaApi = MEDIA_UPDATE_APIS[mediaType]
  const mediaTypePath = getPathForMediaType(mediaType)

  const updateMediaItem = async (formData) => {
    const data = mediaItemForApi({ formData })
    updateMediaApi({
      id,
      data,
      sitename,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updateMediaItem,
    redirectTo: `/${sitename}/dashboard/${MEDIA}/${mediaTypePath}`,
    actionWord: 'updated',
    type: 'media item',
    queryKeyToInvalidate: [mediaTypePath, sitename, id],
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}
