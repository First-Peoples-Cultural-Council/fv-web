import { apiV1 } from 'services/config'

const search = {
  get: async ({ siteId, searchParams, pageParam, perPage = 24 }) => {
    const response = await apiV1
      .get(
        `customSearch/?${searchParams}&ancestorId=${siteId}&page=${pageParam}&perPage=${perPage}`,
      )
      .json()
    const lastPage = Math.ceil(
      (response?.statistics?.resultCount || 0) / perPage,
    )
    const lastSearchFetch = lastPage >= 4 ? 4 : lastPage
    const nextPage = pageParam >= lastPage ? undefined : pageParam + 1
    return { ...response, nextPage, lastPage: lastSearchFetch }
  },
}

export default search
