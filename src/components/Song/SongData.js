import { useParams } from 'react-router'

// FPCC
import { useSong } from 'common/dataHooks/useSongs'

function SongData({ id, sitename }) {
  const { id: paramsId, sitename: paramsSitename } = useParams()

  const idToSend = id || paramsId
  const sitenameToSend = sitename || paramsSitename

  // Data fetch
  const songQueryResponse = useSong({ id: idToSend, sitename: sitenameToSend })

  return {
    songQueryResponse,
    entry: songQueryResponse?.data?.title ? songQueryResponse?.data : {},
  }
}

export default SongData
