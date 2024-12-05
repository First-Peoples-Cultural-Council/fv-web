import { useParams } from 'react-router-dom'

// FPCC
import { useStory } from 'common/dataHooks/useStories'

function StoryData({ id, sitename }) {
  const { id: paramsId, sitename: paramsSitename } = useParams()
  const idToSend = id || paramsId
  const sitenameToSend = sitename || paramsSitename

  // Data fetch
  const storyQueryReturn = useStory({
    id: idToSend,
    sitename: sitenameToSend,
  })

  return {
    storyQueryReturn,
    entry: storyQueryReturn?.data?.title ? storyQueryReturn?.data : {},
  }
}

export default StoryData
