import { useParams } from 'react-router-dom'
import { useStory } from 'common/dataHooks/useStories'

function StoryData({ docId }) {
  const { id, sitename } = useParams()
  const idToSend = docId || id

  // Data fetch
  const { data, isError, isInitialLoading, isFetched, error } = useStory({
    id: idToSend,
  })
  const entry = data?.title ? data : {}

  return {
    notFound: !!(isFetched && entry === null),
    isLoading: isInitialLoading || isError,
    entry,
    sitename,
    error,
  }
}

export default StoryData
