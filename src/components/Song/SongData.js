import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import api from 'services/api'
import songDataAdaptor from 'components/Song/songDataAdaptor'

function SongData({ docId }) {
  const { id, sitename } = useParams()

  const idToSend = docId || id

  // Data fetch
  const response = useQuery(
    ['song', idToSend],
    () => api.document.get({ id: idToSend, contextParameters: 'book' }),
    {
      // The query will not execute until the phraseId has been provided
      enabled: !!idToSend,
    },
  )
  const { data, isError, isInitialLoading } = response
  const entry = songDataAdaptor(data)

  return {
    isLoading: isInitialLoading || isError,
    entry: data?.title ? entry : {},
    sitename,
  }
}

export default SongData
