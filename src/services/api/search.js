import { apiBase } from 'services/config'
import { SEARCH, SITES } from 'common/constants'

const search = {
  get: async ({ sitename, searchParams, pageParam, perPage = 48 }) => {
    if (sitename) {
      return apiBase()
        .get(
          `${SITES}/${sitename}/${SEARCH}/?${searchParams}&page=${pageParam}&pageSize=${perPage}`,
        )
        .json()
    }
    return apiBase()
      .get(`${SEARCH}/?${searchParams}&page=${pageParam}&pageSize=${perPage}`)
      .json()
  },
  getParachute: async ({ sitename, searchParams, perPage }) =>
    apiBase()
      .get(
        `${SITES}/${sitename}/${SEARCH}/?${searchParams}&pageSize=${perPage}`,
      )
      .json(),
}

export default search
