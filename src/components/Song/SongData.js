import { useParams } from 'react-router-dom'

// FPCC

import { useSong } from 'common/dataHooks/useSongs'

function SongData({ docId }) {
  const { id, sitename } = useParams()

  const idToSend = docId || id

  // Data fetch
  const response = useSong({ id: idToSend })

  const { data, isError, isInitialLoading } = response

  return {
    isLoading: isInitialLoading || isError,
    entry: data?.title ? data : {},
    sitename,
  }
}

export default SongData
