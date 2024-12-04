import { useParams } from 'react-router-dom'
import { useStory } from 'common/dataHooks/useStories'

function StoryData({ docId, sitename }) {
  const { id, sitename: paramsSitename } = useParams()

  const idToSend = docId || id
  const sitenameToSend = sitename || paramsSitename

  // Data fetch
  const storyQueryReturn = useStory({
    id: idToSend,
    sitename: sitenameToSend,
  })

  return {
    storyQueryReturn,
    entry: storyQueryReturn?.data?.title ? storyQueryReturn?.data : {},
    sitename: sitenameToSend,
  }
}

export default StoryData
