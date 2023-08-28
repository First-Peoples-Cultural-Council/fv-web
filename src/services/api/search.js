import { apiBase } from 'services/config'
import { SEARCH, SITES } from 'common/constants'

const search = {
  get: async ({ sitename, searchParams, pageParam, perPage = 48 }) =>
    apiBase
      .get(
        `${SITES}/${sitename}/${SEARCH}/?${searchParams}&page=${pageParam}&pageSize=${perPage}`,
      )
      .json(),
}

export default search
