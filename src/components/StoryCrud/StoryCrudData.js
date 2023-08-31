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
    edit: true,
  })

  return {
    activeStep: Number(activeStep),
    storyData: data,
  }
}

export default StoryCrudData
