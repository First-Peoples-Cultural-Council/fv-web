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
import { entryForViewing } from 'common/dataAdaptors/mediaAdaptors'
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
  docType,
  flatListOfSpeakers = false,
}) {
  const { sitename } = useParams()
  const mediaPath = MEDIA_PATHS[docType]
  const mediaApi = MEDIA_APIS[docType]

  const response = useQuery(
    [mediaPath, sitename, id],
    () => mediaApi({ sitename, id }),
    { enabled: !!id },
  )
  return {
    ...response,
    data: entryForViewing({
      type: docType,
      data: response?.data,
      flatListOfSpeakers,
    }),
  }
}

export function useMediaDelete({ docType }) {
  const { sitename } = useParams()
  const deleteMediaApi = MEDIA_DELETE_APIS[docType]

  const deleteMediaFile = async (id) =>
    deleteMediaApi({
      id,
      sitename,
    })
  const mutation = useMutationWithNotification({
    mutationFn: deleteMediaFile,
    actionWord: 'deleted',
    type: docType,
    refresh: true,
  })
  const onSubmit = (id) => {
    mutation.mutate(id)
  }
  return { onSubmit }
}
