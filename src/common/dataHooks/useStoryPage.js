import { useParams } from 'react-router-dom'

// FPCC
import { STORIES } from 'common/constants'
import api from 'services/api'
import { storyPageForApi } from 'common/dataAdaptors/storyPageAdaptors'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'

export function useStoryPageCreate({ storyId }) {
  const { sitename } = useParams()

  const createStoryPage = async (formData) => {
    const properties = storyPageForApi({ item: formData })
    return api.storyPages.create({
      sitename,
      storyId,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: createStoryPage,
    queryKeyToInvalidate: [STORIES, sitename],
    actionWord: 'created',
    type: 'story page',
  })

  const onSubmit = (formData) => mutation.mutate(formData)

  return { onSubmit }
}

export function useStoryPageUpdate({ storyId }) {
  const { sitename } = useParams()

  const updateStoryPage = async (formData) => {
    const properties = storyPageForApi({ item: formData })
    return api.storyPages.update({
      id: formData?.id,
      sitename,
      storyId,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updateStoryPage,
    queryKeyToInvalidate: [STORIES, sitename],
    actionWord: 'updated',
    type: 'story page',
  })

  const onSubmit = (formData) => mutation.mutate(formData)
  return { onSubmit }
}

export function useStoryPageDelete({ storyId }) {
  const { sitename } = useParams()
  const deleteStoryPage = async (id) =>
    api.storyPages.delete({
      id,
      storyId,
      sitename,
    })

  const mutation = useMutationWithNotification({
    mutationFn: deleteStoryPage,
    queryKeyToInvalidate: [STORIES, sitename],
    actionWord: 'deleted',
    type: 'story page',
  })
  const onSubmit = (id) => {
    mutation.mutate(id)
  }
  return { onSubmit }
}
