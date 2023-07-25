import { useQuery } from '@tanstack/react-query'

// FPCC
import {
  AUDIO,
  IMAGE,
  VIDEO,
  AUDIO_PATH,
  IMAGE_PATH,
  VIDEO_PATH,
} from 'common/constants'
import api from 'services/api'

export default function useMediaObject({ sitename, id, type }) {
  const audioResponse = useQuery(
    [AUDIO_PATH, sitename, id],
    () => api.media.getAudio({ sitename, id }),
    { enabled: type === AUDIO && !!id },
  )

  const imageResponse = useQuery(
    [IMAGE_PATH, sitename, id],
    () => api.media.getImage({ sitename, id }),
    { enabled: type === IMAGE && !!id },
  )

  const videoResponse = useQuery(
    [VIDEO_PATH, sitename, id],
    () => api.media.getVideo({ sitename, id }),
    { enabled: type === VIDEO && !!id },
  )

  switch (type) {
    case AUDIO:
      return audioResponse?.data
    case IMAGE:
      return imageResponse?.data
    case VIDEO:
      return videoResponse?.data
    default:
      return {
        message: 'Unrecognized media type!',
      }
  }
}
