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
  const dictionaryEntryQueryReturn = useDictionaryEntry({
    id: idToSend,
    sitename: sitenameToSend,
  })

  return {
    dictionaryEntryQueryReturn,
    entry: dictionaryEntryQueryReturn?.data?.title
      ? dictionaryEntryQueryReturn?.data
      : {},
    actions: ['copy'],
    moreActions: ['share', 'qrcode'],
    sitename: sitenameToSend,
    backHandler,
  }
}

export default DictionaryDetailData
