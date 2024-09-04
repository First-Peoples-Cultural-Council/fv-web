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
import { audienceForApi } from 'common/dataAdaptors/audienceAdaptors'
import { visibilityAdaptor } from 'common/dataAdaptors/visibilityAdaptor'

export function useStories() {
  const { sitename } = useParams()

  const response = useQuery({
    queryKey: [STORIES, sitename],
    queryFn: () => api.stories.getAll({ sitename }),
    ...{ enabled: !!sitename },
  })

  const formatted = response?.data?.results?.map((item) =>
    storySummaryAdaptor({ item }),
  )

  return { ...response, data: { ...response?.data, results: formatted } }
}

export function useStory({ id, sitename, edit = false }) {
  const { sitename: paramsSitename } = useParams()
  const sitenameToSend = sitename || paramsSitename

  const response = useQuery({
    queryKey: [STORIES, sitenameToSend, id],
    queryFn: () => api.stories.get({ sitename: sitenameToSend, id }),
    ...{ enabled: !!id },
  })

  const formatted = edit
    ? storyForEditing({ item: response?.data })
    : storyForViewing({ item: response?.data })

  return { ...response, data: formatted }
}

export function useStoryCreate() {
  const { sitename } = useParams()
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams() // NOSONAR

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
  const [searchParams, setSearchParams] = useSearchParams() // NOSONAR

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

export function useStoryUpdatePageOrder({ storyId }) {
  const { sitename } = useParams()

  const updateStory = async (pageOrderArray) => {
    const properties = {
      pages: pageOrderArray || [],
    }
    return api.stories.partialUpdate({
      id: storyId,
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updateStory,
    queryKeyToInvalidate: [STORIES, sitename],
    actionWord: 'updated',
    type: 'story order',
  })

  const onSubmit = (pageOrderArray) => mutation.mutate(pageOrderArray)
  return { onSubmit }
}

export function useStoryUpdateAudience({ storyId }) {
  const { sitename } = useParams()

  const updateStory = async (formData) => {
    const properties = {
      ...audienceForApi({ item: formData }),
      ...visibilityAdaptor({ item: formData }),
    }
    return api.stories.partialUpdate({
      id: storyId,
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updateStory,
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
    redirectTo: `/${sitename}/dashboard/edit/entries?types=story`,
    queryKeyToInvalidate: [STORIES, sitename],
    actionWord: 'deleted',
    type: 'story',
  })
  const onSubmit = (id) => {
    mutation.mutate(id)
  }
  return { onSubmit }
}
