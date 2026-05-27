import { apiBase } from 'services/config'
import { SITES, EXPORT_JOBS } from 'common/constants'

const exportJobs = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${EXPORT_JOBS}/${id}`).json(),
  getAll: async ({ sitename, pageParam, perPage = 48 }) =>
    apiBase()
      .get(
        `${SITES}/${sitename}/${EXPORT_JOBS}/?page=${pageParam}&pageSize=${perPage}`,
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
