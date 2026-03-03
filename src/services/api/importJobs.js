import { apiBase } from 'services/config'
import { SITES, IMPORT_JOBS } from 'common/constants'

const importJobs = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${IMPORT_JOBS}/${id}`).json(),
  getAll: async ({ sitename, pageParam, perPage = 48 }) =>
    apiBase()
      .get(
        `${SITES}/${sitename}/${IMPORT_JOBS}/?page=${pageParam}&pageSize=${perPage}`,
      )
      .json(),
  create: async ({ sitename, formData }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${IMPORT_JOBS}/`, { body: formData })
      .json(),
  addMedia: async ({ sitename, formData }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${IMPORT_JOBS}/media`, { body: formData })
      .json(),
  validate: async ({ sitename, id }) =>
    apiBase().post(`${SITES}/${sitename}/${IMPORT_JOBS}/${id}/validate`).json(),
  delete: async ({ sitename, id }) =>
    apiBase().delete(`${SITES}/${sitename}/${IMPORT_JOBS}/${id}`).json(),
}

export default importJobs
