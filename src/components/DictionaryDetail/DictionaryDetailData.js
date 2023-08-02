import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// FPCC
import useDictionaryEntry from 'common/dataHooks/useDictionaryEntry'

function DictionaryDetailData({ docId }) {
  const { id, sitename } = useParams()
  const navigate = useNavigate()

  const idToSend = docId || id

  const backHandler = () => navigate(-1)

  // Data fetch
  const { data, error, isError, isInitialLoading } = useDictionaryEntry({
    id: idToSend,
  })

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  return {
    isLoading: isInitialLoading || isError,
    entry: data?.title ? data : {},
    actions: ['copy'],
    moreActions: ['share', 'qrcode'],
    sitename,
    backHandler,
  }
}

export default DictionaryDetailData
