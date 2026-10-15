import { apiBase } from 'services/config'
import { PAGE, PAGE_SIZE, SITES, ORGANIZATIONS } from 'common/constants'

const songs = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${ORGANIZATIONS}/${id}`).json(),
  getAll: async ({ sitename, pageParam, perPage = 48 }) =>
    apiBase()
      .get(
        `${SITES}/${sitename}/${ORGANIZATIONS}/?${PAGE}=${pageParam}&${PAGE_SIZE}=${perPage}`,
      )
      .json(),
  create: async ({ sitename, properties }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${ORGANIZATIONS}/`, { json: properties })
      .json(),
  update: async ({ sitename, id, properties }) =>
    apiBase()
      .put(`${SITES}/${sitename}/${ORGANIZATIONS}/${id}`, { json: properties })
      .json(),
  delete: async ({ sitename, id }) =>
    apiBase().delete(`${SITES}/${sitename}/${ORGANIZATIONS}/${id}`).json(),
}

export default songs
