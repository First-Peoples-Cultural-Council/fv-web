import { useNavigate, useSearchParams } from 'react-router-dom'

// FPCC
import { useMediaObject, useMediaUpdate } from 'common/dataHooks/useMedia'

function MediaEditData({ mediaType }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const mediaId = searchParams.get('id')

  const { data, isLoading } = useMediaObject({
    id: mediaId,
    mediaType,
  })

  const { onSubmit: updateEntry } = useMediaUpdate({ mediaType })
  const submitHandler = (formData) => updateEntry(formData)
  const backHandler = () => navigate(`../../media/browser?types=${mediaType}`)

  return {
    isLoading,
    dataToEdit: data,
    submitHandler,
    backHandler,
  }
}

export default MediaEditData
