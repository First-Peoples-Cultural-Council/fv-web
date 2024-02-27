import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import {
  IMAGE,
  VIDEO,
  AUDIO_PATH,
  IMAGE_PATH,
  VIDEO_PATH,
} from 'common/constants'
import api from 'services/api'

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

export function useMediaUsageDetails({ id, docType }) {
  const { sitename } = useParams()

  let mediaPath = ''
  let mediaApi = null

  if (docType === IMAGE) {
    mediaApi = api.media.getImage
    mediaPath = IMAGE_PATH
  } else if (docType === VIDEO) {
    mediaApi = api.media.getVideo
    mediaPath = VIDEO_PATH
  } else {
    mediaApi = api.media.getAudio
    mediaPath = AUDIO_PATH
  }

  const response = useQuery(
    [mediaPath, sitename, id],
    () => mediaApi({ sitename, id }),
    { enabled: !!id },
  )
  return response?.data
}

export function useMediaDelete({ docType }) {
  const { sitename } = useParams()
  let deleteMediaApi = null

  if (docType === IMAGE) {
    deleteMediaApi = api.media.deleteImage
  } else if (docType === VIDEO) {
    deleteMediaApi = api.media.deleteVideo
  } else {
    deleteMediaApi = api.media.deleteAudio
  }

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
