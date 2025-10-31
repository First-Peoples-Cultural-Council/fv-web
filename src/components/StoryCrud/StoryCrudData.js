import { useSearchParams } from 'react-router'

// FPCC
import { useStory, useStoryDelete } from 'common/dataHooks/useStories'

function StoryCrudData() {
  const [searchParams] = useSearchParams()
  const activeStep = searchParams.get('step')
    ? parseInt(searchParams.get('step'), 10)
    : 0
  const storyId = searchParams.get('id') || null

  const { onSubmit: deleteStory } = useStoryDelete()

  const queryResponse = useStory({
    id: storyId,
    edit: true,
  })

  return {
    activeStep: Number(activeStep),
    queryResponse,
    deleteHandler: () => deleteStory(storyId),
  }
}

export default StoryCrudData
