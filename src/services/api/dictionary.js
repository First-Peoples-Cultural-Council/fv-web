import { apiV1 } from 'services/config'

const dictionary = {
  get: async ({ siteId, searchParams, pageParam, perPage = 48 }) => {
    const response = await apiV1
      .get(
        `dictionary/${siteId}?${searchParams}&page=${pageParam}&perPage=${perPage}`,
      )
      .json()
    const lastPage = Math.ceil(
      (response?.statistics?.resultCount || 0) / perPage,
    )
    const nextPage = pageParam >= lastPage ? undefined : pageParam + 1
    return { ...response, nextPage, lastPage }
  },
}

export default dictionary
