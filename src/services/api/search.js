import { apiBase } from 'services/config'
import { PAGE, PAGE_SIZE, SEARCH, SITES } from 'common/constants'

const search = {
  get: async ({ sitename, searchParams, pageParam, perPage = 48 }) =>
    apiBase()
      .get(
        `${SITES}/${sitename}/${SEARCH}/?${searchParams}&${PAGE}=${pageParam}&${PAGE_SIZE}=${perPage}`,
      )
      .json(),
  getFVWideSearch: async ({ searchParams, pageParam, perPage = 48 }) =>
    apiBase()
      .get(
        `${SEARCH}/?${searchParams}&${PAGE}=${pageParam}&${PAGE_SIZE}=${perPage}`,
      )
      .json(),
  getParachute: async ({ sitename, searchParams, perPage }) =>
    apiBase()
      .get(
        `${SITES}/${sitename}/${SEARCH}/?${searchParams}&${PAGE_SIZE}=${perPage}`,
      )
      .json(),
}

export default search
