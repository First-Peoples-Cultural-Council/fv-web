import { useNavigate, useParams, useSearchParams } from 'react-router'

// FPCC
import { useVideo, useVideoUpdate } from 'common/dataHooks/useVideos'
import { MEDIA, VIDEO_PATH } from 'common/constants'

function VideoCrudData() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { sitename } = useParams()
  const id = searchParams.get('id')

  const queryResponse = useVideo({ id, edit: true })

  const { onSubmit } = useVideoUpdate({ id })
  const submitHandler = (formData) => onSubmit(formData)
  const backHandler = () =>
    navigate(`/${sitename}/dashboard/${MEDIA}/${VIDEO_PATH}`)

  return {
    queryResponse,
    submitHandler,
    backHandler,
  }
}

export default VideoCrudData
