import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// FPCC

import { useSong } from 'common/dataHooks/useSongs'

function SongData({ docId, sitename }) {
  const { id, sitename: paramsSitename } = useParams()
  const navigate = useNavigate()

  const idToSend = docId || id
  const sitenameToSend = sitename || paramsSitename

  // Data fetch
  const response = useSong({ id: idToSend, sitename: sitenameToSend })

  const { data, error, isError, isInitialLoading } = response

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitenameToSend}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  return {
    isLoading: isInitialLoading || isError,
    entry: data?.title ? data : {},
    sitename: sitenameToSend,
  }
}

export default SongData
