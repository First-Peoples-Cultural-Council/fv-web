import { useParams } from 'react-router-dom'

// FPCC

import { useSong } from 'common/dataHooks/useSongs'

function SongData({ docId, sitename }) {
  const { id, sitename: paramsSitename } = useParams()

  const idToSend = docId || id
  const sitenameToSend = sitename || paramsSitename

  // Data fetch
  const response = useSong({ id: idToSend, sitename: sitenameToSend })

  const { data, isError, isInitialLoading } = response

  return {
    isLoading: isInitialLoading || isError,
    entry: data?.title ? data : {},
    sitename: sitenameToSend,
  }
}

export default SongData
