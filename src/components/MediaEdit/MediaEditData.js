import { useNavigate, useSearchParams } from 'react-router-dom'

// FPCC
import { useMediaUsageDetails, useMediaUpdate } from 'common/dataHooks/useMedia'

function MediaEditData({ docType }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const mediaId = searchParams.get('id')

  const { data, isLoading } = useMediaUsageDetails({
    id: mediaId,
    docType,
    flatListOfSpeakers: true,
  })

  const { onSubmit: updateEntry } = useMediaUpdate({ docType })
  const submitHandler = (FormData) => updateEntry(FormData)
  const backHandler = () => navigate(`../../media/browser?types=${docType}`)

  return {
    isLoading,
    dataToEdit: data,
    submitHandler,
    backHandler,
  }
}

export default MediaEditData
