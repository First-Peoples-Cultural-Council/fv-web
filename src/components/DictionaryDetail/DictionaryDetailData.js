import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

// FPCC
import dictionaryDataAdaptor from 'components/DictionaryDetail/dictionaryDataAdaptor'
import api from 'services/api'
import { DOC_WORD } from 'common/constants'

function DictionaryDetailData({ docId, docType }) {
  const { id, sitename } = useParams()
  const navigate = useNavigate()

  const idToSend = docId || id
  const contextParameters = docType === DOC_WORD ? 'word' : 'phrase'

  const backHandler = () => navigate(-1)

  // Data fetch
  const response = useQuery(
    [docType, idToSend],
    () => api.document.get({ id: idToSend, contextParameters }),
    {
      // The query will not execute until the id has been provided
      enabled: !!idToSend,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )
  const { data, error, isError, isLoading } = response
  const entry = dictionaryDataAdaptor(data)

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  return {
    isLoading: isLoading || isError,
    entry: data?.title ? entry : {},
    actions: ['copy'],
    moreActions: ['share', 'qrcode'],
    sitename,
    backHandler,
  }
}

export default DictionaryDetailData
