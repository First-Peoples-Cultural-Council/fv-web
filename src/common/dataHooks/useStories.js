import { useQuery } from '@tanstack/react-query'

// FPCC
import { STORIES } from 'common/constants'
import api from 'services/api'
import { storySummaryAdaptor, storyDetailAdaptor } from 'common/dataAdaptors'

export function useStories({ sitename }) {
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

export function useStory({ sitename, id }) {
  const response = useQuery(
    [STORIES, sitename, id],
    () => api.stories.get({ sitename, id }),
    { enabled: !!id },
  )

  const formatted = storyDetailAdaptor({ item: response?.data })

  return { ...response, data: formatted }
}
