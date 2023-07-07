import { apiBase } from 'services/config'
import { SEARCH, SITES } from 'common/constants'

const search = {
  get: async ({ sitename, searchParams, page, perPage = 48 }) => {
    const response = await apiBase
      .get(
        `${SITES}/${sitename}/${SEARCH}/?${searchParams}&page=${page}&pageSize=${perPage}`,
      )
      .json()
    return { ...response, nextPage: response?.next, lastPage: response?.pages }
  },
}

export default search
