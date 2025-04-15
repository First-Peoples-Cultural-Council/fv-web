import { useParams } from 'react-router'

// FPCC
import { useStory } from 'common/dataHooks/useStories'

function StoryData({ id, sitename }) {
  const { id: paramsId, sitename: paramsSitename } = useParams()
  const idToSend = id || paramsId
  const sitenameToSend = sitename || paramsSitename

  // Data fetch
  const storyQueryResponse = useStory({
    id: idToSend,
    sitename: sitenameToSend,
  })

  return {
    storyQueryResponse,
    entry: storyQueryResponse?.data?.title ? storyQueryResponse?.data : {},
  }
}

export default StoryData
