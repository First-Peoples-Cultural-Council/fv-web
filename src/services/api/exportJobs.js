import { apiBase } from 'services/config'
import { PAGE, PAGE_SIZE, SITES, EXPORT_JOBS } from 'common/constants'

const exportJobs = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${EXPORT_JOBS}/${id}`).json(),
  getAll: async ({ sitename, pageParam, perPage = 48 }) =>
    apiBase()
      .get(
        `${SITES}/${sitename}/${EXPORT_JOBS}/?${PAGE}=${pageParam}&${PAGE_SIZE}=${perPage}`,
      )
      .json(),
  create: async ({ sitename, searchParams }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${EXPORT_JOBS}/?${searchParams}`)
      .json(),
  delete: async ({ sitename, id }) =>
    apiBase().delete(`${SITES}/${sitename}/${EXPORT_JOBS}/${id}`).json(),
}

export default exportJobs
