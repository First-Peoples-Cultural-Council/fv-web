import { useNavigate, useSearchParams } from 'react-router-dom'

// FPCC
import { useMediaUsageDetails, useMediaUpdate } from 'common/dataHooks/useMedia'

function MediaEditData({ mediaType }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const mediaId = searchParams.get('id')

  const { data, isLoading } = useMediaUsageDetails({
    id: mediaId,
    mediaType,
    flatListOfSpeakers: true,
  })

  const { onSubmit: updateEntry } = useMediaUpdate({ mediaType })
  const submitHandler = (FormData) => updateEntry(FormData)
  const backHandler = () => navigate(`../../media/browser?types=${mediaType}`)

  return {
    isLoading,
    dataToEdit: data,
    submitHandler,
    backHandler,
  }
}

export default MediaEditData
