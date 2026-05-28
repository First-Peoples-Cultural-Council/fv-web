import { apiBase } from 'services/config'
import { PAGE, PAGE_SIZE, SITES, SONGS } from 'common/constants'

const songs = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${SONGS}/${id}`).json(),
  getAll: async ({ sitename, pageParam, perPage = 48 }) =>
    apiBase()
      .get(
        `${SITES}/${sitename}/${SONGS}/?${PAGE}=${pageParam}&${PAGE_SIZE}=${perPage}`,
      )
      .json(),
  create: async ({ sitename, properties }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${SONGS}/`, { json: properties })
      .json(),
  update: async ({ sitename, id, properties }) =>
    apiBase()
      .put(`${SITES}/${sitename}/${SONGS}/${id}`, { json: properties })
      .json(),
  delete: async ({ sitename, id }) =>
    apiBase().delete(`${SITES}/${sitename}/${SONGS}/${id}`).json(),
}

export default songs
