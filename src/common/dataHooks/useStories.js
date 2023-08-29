import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { STORIES } from 'common/constants'
import api from 'services/api'
import {
  storySummaryAdaptor,
  storyDetailAdaptor,
  storyForApi,
} from 'common/dataAdaptors/storyAdaptors'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'

export function useStories() {
  const { sitename } = useParams()

  const response = useQuery(
    [STORIES, sitename],
    () => api.stories.getAll({ sitename }),
    { enabled: !!sitename },
  )

  const formatted = response?.data?.results?.map((item) =>
    storySummaryAdaptor({ item }),
  )

  return { ...response, data: { ...response?.data, results: formatted } }
}

export function useStory({ id }) {
  const { sitename } = useParams()

  const response = useQuery(
    [STORIES, sitename, id],
    () => api.stories.get({ sitename, id }),
    { enabled: !!id },
  )

  const formatted = storyDetailAdaptor({ item: response?.data })

  return { ...response, data: formatted }
}

export function useStoryCreate() {
  const { sitename } = useParams()

  const createStory = async (formData) => {
    const properties = storyForApi({ formData })
    return api.stories.create({
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: createStory,
    redirectTo: `/${sitename}/dashboard/edit/stories`,
    queryKeyToInvalidate: [STORIES, sitename],
    actionWord: 'created',
    type: 'story',
  })

  const onSubmit = (formData) => mutation.mutate(formData)

  return { onSubmit }
}

export function useStoryUpdate() {
  const { sitename } = useParams()

  const updateStory = async (formData) => {
    const properties = storyForApi({ formData })
    return api.stories.update({
      id: formData?.id,
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updateStory,
    redirectTo: `/${sitename}/dashboard/edit/stories`,
    queryKeyToInvalidate: [STORIES, sitename],
    actionWord: 'updated',
    type: 'story',
  })

  const onSubmit = (formData) => mutation.mutate(formData)
  return { onSubmit }
}

export function useStoryDelete() {
  const { sitename } = useParams()
  const deleteStory = async (id) =>
    api.stories.delete({
      id,
      sitename,
    })

  const mutation = useMutationWithNotification({
    mutationFn: deleteStory,
    redirectTo: `/${sitename}/dashboard/edit/stories`,
    queryKeyToInvalidate: [STORIES, sitename],
    actionWord: 'deleted',
    type: 'story',
  })
  const onSubmit = (id) => {
    mutation.mutate(id)
  }
  return { onSubmit }
}
