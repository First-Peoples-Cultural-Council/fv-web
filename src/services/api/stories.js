import { apiBase } from 'services/config'
import { SITES, STORIES } from 'common/constants'

const stories = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${STORIES}/${id}`).json(),
  getAll: async ({ sitename }) =>
    apiBase().get(`${SITES}/${sitename}/${STORIES}/`).json(),
  create: async ({ sitename, properties }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${STORIES}/`, { json: properties })
      .json(),
  update: async ({ sitename, id, properties }) =>
    apiBase()
      .put(`${SITES}/${sitename}/${STORIES}/${id}`, { json: properties })
      .json(),
  partialUpdate: async ({ sitename, id, properties }) =>
    apiBase()
      .patch(`${SITES}/${sitename}/${STORIES}/${id}`, { json: properties })
      .json(),
  delete: async ({ sitename, id }) =>
    apiBase().delete(`${SITES}/${sitename}/${STORIES}/${id}`).json(),
}

export default stories
