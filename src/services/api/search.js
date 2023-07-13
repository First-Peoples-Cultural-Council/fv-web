import { apiBase } from 'services/config'
import { SEARCH, SITES } from 'common/constants'

const search = {
  get: async ({ sitename, searchParams, page, perPage = 48 }) =>
    apiBase
      .get(
        `${SITES}/${sitename}/${SEARCH}/?${searchParams}&page=${page}&pageSize=${perPage}`,
      )
      .json(),
}

export default search
