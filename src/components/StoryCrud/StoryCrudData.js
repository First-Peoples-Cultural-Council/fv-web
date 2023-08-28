import { useSearchParams } from 'react-router-dom'

// FPCC
import { useStory } from 'common/dataHooks/useStories'

function StoryCrudData() {
  const [searchParams] = useSearchParams()
  const activeStep = searchParams.get('step')
    ? parseInt(searchParams.get('step'), 10)
    : 0
  const storyId = searchParams.get('id') || null

  const { data } = useStory({
    id: storyId,
  })

  return {
    activeStep: Number(activeStep),
    storyId,
    storyState: data?.state || 'New',
  }
}

export default StoryCrudData
