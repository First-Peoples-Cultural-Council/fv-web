import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { AUDIO_PATH, IMAGE_PATH, VIDEO_PATH } from 'common/constants'
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
