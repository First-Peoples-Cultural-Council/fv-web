import { apiBase } from 'services/config'
import { SITES, CATEGORIES } from 'common/constants'

const categories = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${CATEGORIES}/${id}`).json(),
  getAll: async ({ sitename, nested }) =>
    apiBase()
      .get(`${SITES}/${sitename}/${CATEGORIES}/?nested=${nested}`)
      .json(),
  create: async ({ sitename, properties }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${CATEGORIES}/`, { json: properties })
      .json(),
  update: async ({ sitename, id, properties }) =>
    apiBase()
      .put(`${SITES}/${sitename}/${CATEGORIES}/${id}`, { json: properties })
      .json(),
  delete: async ({ sitename, id }) =>
    apiBase().delete(`${SITES}/${sitename}/${CATEGORIES}/${id}`).json(),
}

export default categories
