import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

// FPCC
import { useMediaObject, useMediaUpdate } from 'common/dataHooks/useMedia'
import { getPathForMediaType } from 'common/utils/mediaHelpers'
import { MEDIA } from 'common/constants'

function MediaEditData({ mediaType }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { sitename } = useParams()
  const mediaId = searchParams.get('id')
  const mediaTypePath = getPathForMediaType(mediaType)

  const mediaQueryResponse = useMediaObject({
    id: mediaId,
    mediaType,
    edit: true,
  })

  const { onSubmit } = useMediaUpdate({ mediaType, id: mediaId })
  const submitHandler = (formData) => onSubmit(formData)
  const backHandler = () =>
    navigate(`/${sitename}/dashboard/${MEDIA}/${mediaTypePath}`)

  return {
    mediaQueryResponse,
    submitHandler,
    backHandler,
  }
}

export default MediaEditData
