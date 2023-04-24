import { api } from 'services/config'

const song = {
  get: async ({ siteId, searchParams, pageParam, perPage = 48 }) => {
    const response = await api
      .get(
        `songs/${siteId}?${searchParams}&page=${pageParam}&perPage=${perPage}`,
      )
      .json()
    const lastPage = Math.ceil(
      (response?.statistics?.resultCount || 0) / perPage,
    )
    const nextPage = pageParam >= lastPage ? undefined : pageParam + 1
    return { ...response, nextPage, lastPage }
  },
}

export default song
