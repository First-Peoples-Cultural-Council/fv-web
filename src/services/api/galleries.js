import { apiBase } from 'services/config'
import { GALLERIES, PAGE, PAGE_SIZE, SITES } from 'common/constants'

const galleries = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${GALLERIES}/${id}`).json(),
  getAll: async ({ sitename, pageParam, perPage = 48 }) =>
    apiBase()
      .get(
        `${SITES}/${sitename}/${GALLERIES}/?${PAGE}=${pageParam}&${PAGE_SIZE}=${perPage}`,
      )
      .json(),
  create: async ({ sitename, properties }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${GALLERIES}/`, { json: properties })
      .json(),
  update: async ({ sitename, id, properties }) =>
    apiBase()
      .put(`${SITES}/${sitename}/${GALLERIES}/${id}`, { json: properties })
      .json(),
  delete: async ({ sitename, id }) =>
    apiBase().delete(`${SITES}/${sitename}/${GALLERIES}/${id}`).json(),
}

export default galleries
