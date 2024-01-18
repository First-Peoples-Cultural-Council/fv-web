import { useParams } from 'react-router-dom'
import { useStory } from 'common/dataHooks/useStories'

function StoryData({ docId, sitename }) {
  const { id, sitename: paramsSitename } = useParams()

  const idToSend = docId || id
  const sitenameToSend = sitename || paramsSitename

  // Data fetch
  const { data, isError, isInitialLoading, isFetched, error } = useStory({
    id: idToSend,
    sitename: sitenameToSend,
  })
  const entry = data?.title ? data : {}

  return {
    notFound: !!(isFetched && entry === null),
    isLoading: isInitialLoading || isError,
    entry,
    sitename: sitenameToSend,
    error,
  }
}

export default StoryData
