import { useSearchParams } from 'react-router-dom'

// FPCC
import { useMediaUsageDetails, useMediaUpdate } from 'common/dataHooks/useMedia'

function MediaEditData({ docType }) {
  const [searchParams] = useSearchParams()
  const mediaId = searchParams.get('id')

  const { data, isLoading } = useMediaUsageDetails({
    id: mediaId,
    docType,
    flatListOfSpeakers: true,
  })

  const { onSubmit: updateEntry } = useMediaUpdate({ docType })
  const submitHandler = (FormData) => updateEntry(FormData)

  return {
    isLoading,
    dataToEdit: data,
    submitHandler,
  }
}

export default MediaEditData
