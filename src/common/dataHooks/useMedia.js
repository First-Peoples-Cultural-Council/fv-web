import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import { AUDIO, AUDIO_PATH, IMAGE, IMAGE_PATH, VIDEO, VIDEO_PATH, MEDIA } from 'common/constants'
import { mediaItemForEditing, mediaItemForApi } from 'common/dataAdaptors/mediaAdaptors'
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

  return {
    ...response,
    data: mediaItemForEditing({
      type: mediaType,
      data: response?.data,
    }),
  }
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

export function useMediaUpdate({ mediaType }) {
  const { sitename } = useParams()
  const updateMediaApi = MEDIA_UPDATE_APIS[mediaType]
  const mediaTypePath = getPathForMediaType(mediaType)

  const updateMediaItem = async (formData) => {
    const data = mediaItemForApi({ formData, mediaType })
    updateMediaApi({
      id: formData?.id,
      data,
      sitename,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updateMediaItem,
    redirectTo: `/${sitename}/dashboard/${MEDIA}/${mediaTypePath}`,
    actionWord: 'updated',
    type: 'media item',
  })

  const onSubmit = (id) => {
    mutation.mutate(id)
  }
  return { onSubmit }
}
