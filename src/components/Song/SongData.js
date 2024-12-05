import { useParams } from 'react-router-dom'

// FPCC
import { useSong } from 'common/dataHooks/useSongs'

function SongData({ id, sitename }) {
  const { id: paramsId, sitename: paramsSitename } = useParams()

  const idToSend = id || paramsId
  const sitenameToSend = sitename || paramsSitename

  // Data fetch
  const songQueryReturn = useSong({ id: idToSend, sitename: sitenameToSend })

  return {
    songQueryReturn,
    entry: songQueryReturn?.data?.title ? songQueryReturn?.data : {},
  }
}

export default SongData
