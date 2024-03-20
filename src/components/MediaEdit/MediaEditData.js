import { useSearchParams } from 'react-router-dom'

// FPCC
import { useMediaUsageDetails } from 'common/dataHooks/useMedia'

function MediaEditData({ docType }) {
  const [searchParams] = useSearchParams()
  const mediaId = searchParams.get('id')

  const { data, isLoading } = useMediaUsageDetails({
    id: mediaId,
    docType,
    flatListOfSpeakers: true,
  })

  return {
    dataToEdit: data,
    isLoading,
  }
}

export default MediaEditData
