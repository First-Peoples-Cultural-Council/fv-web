// FPCC
import { useStoryUpdateAudience } from 'common/dataHooks/useStories'

function StoryAudienceCrudData({ storyData }) {
  const { onSubmit: update } = useStoryUpdateAudience({
    storyId: storyData?.id,
  })

  const submitHandler = (formData) => {
    if (storyData?.id) {
      update(formData)
    }
  }

  return {
    dataToEdit: storyData,
    submitHandler,
  }
}

export default StoryAudienceCrudData
