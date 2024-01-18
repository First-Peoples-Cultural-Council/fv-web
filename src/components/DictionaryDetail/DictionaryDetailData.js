import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// FPCC
import { useDictionaryEntry } from 'common/dataHooks/useDictionaryEntry'

function DictionaryDetailData({ id, sitename }) {
  const { id: paramsId, sitename: paramsSitename } = useParams()
  const navigate = useNavigate()

  const idToSend = id || paramsId
  const sitenameToSend = sitename || paramsSitename

  const backHandler = () => navigate(-1)

  // Data fetch
  const { data, error, isError, isInitialLoading } = useDictionaryEntry({
    id: idToSend,
    sitename: sitenameToSend,
  })

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
    actions: ['copy'],
    moreActions: ['share', 'qrcode'],
    sitename: sitenameToSend,
    backHandler,
  }
}

export default DictionaryDetailData
