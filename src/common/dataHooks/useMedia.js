import { useQuery } from '@tanstack/react-query'

// FPCC
import { AUDIO_PATH, IMAGE_PATH, VIDEO_PATH } from 'common/constants'
import api from 'services/api'

export function useAudioObject({ sitename, id }) {
  const response = useQuery(
    [AUDIO_PATH, sitename, id],
    () => api.media.getAudio({ sitename, id }),
    { enabled: !!id },
  )
  return response?.data
}

export function useImageObject({ sitename, id }) {
  const response = useQuery(
    [IMAGE_PATH, sitename, id],
    () => api.media.getImage({ sitename, id }),
    { enabled: !!id },
  )
  return response?.data
}

export function useVideoObject({ sitename, id }) {
  const response = useQuery(
    [VIDEO_PATH, sitename, id],
    () => api.media.getVideo({ sitename, id }),
    { enabled: !!id },
  )
  return response?.data
}
