import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router-dom'

// FPCC
import { STORIES } from 'common/constants'
import api from 'services/api'
import {
  storySummaryAdaptor,
  storyForViewing,
  storyForEditing,
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

export function useStory({ id, edit = false }) {
  const { sitename } = useParams()

  const response = useQuery(
    [STORIES, sitename, id],
    () => api.stories.get({ sitename, id }),
    { enabled: !!id },
  )

  const formatted = edit
    ? storyForEditing({ item: response?.data })
    : storyForViewing({ item: response?.data })

  return { ...response, data: formatted }
}

export function useStoryCreate() {
  const { sitename } = useParams()
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams()

  const createStory = async (formData) => {
    const properties = storyForApi({ formData })
    return api.stories.create({
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: createStory,
    queryKeyToInvalidate: [STORIES, sitename],
    actionWord: 'created',
    type: 'story',
    onSuccessCallback: (response) =>
      setSearchParams({ step: 1, id: response?.id }),
  })

  const onSubmit = (formData) => mutation.mutate(formData)

  return { onSubmit }
}

export function useStoryUpdate() {
  const { sitename } = useParams()
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams()

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
    queryKeyToInvalidate: [STORIES, sitename],
    actionWord: 'updated',
    type: 'story',
    onSuccessCallback: (response) =>
      setSearchParams({ step: 1, id: response?.id }),
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
