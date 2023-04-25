import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import api from 'services/api'
import storyDataAdaptor from 'components/Story/storyDataAdaptor'

function StoryData({ docId }) {
  const { id, sitename } = useParams()

  const idToSend = docId || id

  // Data fetch
  const response = useQuery(
    ['story', idToSend],
    () => api.document.get({ id: idToSend, contextParameters: 'book' }),
    {
      // The query will not execute until the id has been provided
      enabled: !!idToSend,
    },
  )
  const { data, isError, isLoading, isFetched, error } = response
  const entry = storyDataAdaptor({ data })

  return {
    notFound: !!(isFetched && entry === null),
    isLoading: isLoading || isError,
    entry: data?.title ? entry : {},
    sitename,
    error,
  }
}

export default StoryData
