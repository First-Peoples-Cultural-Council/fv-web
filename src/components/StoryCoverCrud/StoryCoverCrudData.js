// FPCC
import {
  useStoryCreate,
  useStoryUpdate,
  useStoryDelete,
} from 'common/dataHooks/useStories'

function StoryCoverCrudData({ storyData }) {
  const { onSubmit: create } = useStoryCreate()
  const { onSubmit: update } = useStoryUpdate()
  const { onSubmit: deleteStory } = useStoryDelete()

  const submitHandler = (formData) => {
    if (storyData?.id) {
      update(formData)
    } else {
      create(formData)
    }
  }

  return {
    dataToEdit: storyData,
    submitHandler,
    deleteHandler: () => deleteStory(storyData?.id),
  }
}

export default StoryCoverCrudData
