import { useNavigate, useParams } from 'react-router'

// FPCC
import { useDictionaryEntry } from 'common/dataHooks/useDictionaryEntry'

function DictionaryDetailData({ id, sitename }) {
  const { id: paramsId, sitename: paramsSitename } = useParams()
  const navigate = useNavigate()

  const idToSend = id || paramsId
  const sitenameToSend = sitename || paramsSitename

  const backHandler = () => navigate(-1)

  // Data fetch
  const dictionaryEntryQueryResponse = useDictionaryEntry({
    id: idToSend,
    sitename: sitenameToSend,
  })

  return {
    dictionaryEntryQueryResponse,
    entry: dictionaryEntryQueryResponse?.data?.title
      ? dictionaryEntryQueryResponse?.data
      : {},
    actions: ['copy'],
    moreActions: ['share', 'qrcode'],
    sitename: sitenameToSend,
    backHandler,
  }
}

export default DictionaryDetailData
