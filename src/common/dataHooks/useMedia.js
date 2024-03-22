import { useQuery } from '@tanstack/react-query'
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
} from 'common/constants'
import {
  entryForViewing,
  entryForEditing,
} from 'common/dataAdaptors/mediaAdaptors'
import api from 'services/api'

const MEDIA_PATHS = {
  [AUDIO]: AUDIO_PATH,
  [IMAGE]: IMAGE_PATH,
  [VIDEO]: VIDEO_PATH,
}

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
  const response = useQuery(
    [AUDIO_PATH, sitename, id],
    () => api.media.getAudio({ sitename, id }),
    { enabled: !!id },
  )
  return response?.data
}

export function useImageObject({ id }) {
  const { sitename } = useParams()
  const response = useQuery(
    [IMAGE_PATH, sitename, id],
    () => api.media.getImage({ sitename, id }),
    { enabled: !!id },
  )
  return response?.data
}

export function useVideoObject({ id }) {
  const { sitename } = useParams()
  const response = useQuery(
    [VIDEO_PATH, sitename, id],
    () => api.media.getVideo({ sitename, id }),
    { enabled: !!id },
  )
  return response?.data
}

export function useMediaUsageDetails({
  id,
  mediaType,
  flatListOfSpeakers = false,
}) {
  const { sitename } = useParams()
  const mediaPath = MEDIA_PATHS[mediaType]
  const mediaApi = MEDIA_APIS[mediaType]

  const response = useQuery(
    [mediaPath, sitename, id],
    () => mediaApi({ sitename, id }),
    { enabled: !!id },
  )
  return {
    ...response,
    data: entryForViewing({
      type: mediaType,
      data: response?.data,
      flatListOfSpeakers,
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

  const updateMediaItem = async (formData) => {
    const data = entryForEditing({ formData })
    updateMediaApi({
      id: formData?.id,
      data,
      sitename,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updateMediaItem,
    redirectTo: `/${sitename}/dashboard/media/browser?types=${mediaType}`,
    actionWord: 'updated',
    type: 'media item',
  })

  const onSubmit = (id) => {
    mutation.mutate(id)
  }
  return { onSubmit }
}
