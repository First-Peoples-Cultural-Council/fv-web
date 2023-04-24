import { api } from 'services/config'

const songsAndStories = {
  get: async ({ siteId, searchParams, pageParam, perPage = 20 }) => {
    const response = await api
      .get(
        `songs_and_stories/${siteId}?${searchParams}&page=${pageParam}&perPage=${perPage}`,
      )
      .json()
    const lastPage = Math.ceil(
      (response?.statistics?.resultCount || 0) / perPage,
    )
    const nextPage = pageParam >= lastPage ? undefined : pageParam + 1
    return { ...response, nextPage, lastPage }
  },
}

export default songsAndStories
