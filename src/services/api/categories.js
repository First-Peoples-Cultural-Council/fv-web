import { apiBase } from 'services/config'
import { SITES, CATEGORIES } from 'common/constants'

const people = {
  get: async ({ sitename, id }) =>
    apiBase.get(`${SITES}/${sitename}/${CATEGORIES}/${id}`).json(),
  create: async ({ sitename, properties }) => {
    const body = {
      title: properties?.title,
      description: properties?.description,
      parent_id: properties?.parentId,
    }
    return apiBase
      .post(`${SITES}/${sitename}/${CATEGORIES}/`, { json: body })
      .json()
  },
  update: async ({ sitename, id, properties }) => {
    const body = {
      title: properties?.title,
      description: properties?.description,
      parent_id: properties?.parentId,
    }
    return apiBase
      .put(`${SITES}/${sitename}/${CATEGORIES}/${id}`, { json: body })
      .json()
  },
  delete: async ({ sitename, id }) =>
    apiBase.delete(`${SITES}/${sitename}/${CATEGORIES}/${id}`).json(),
  getAll: async ({ sitename }) =>
    apiBase.get(`${SITES}/${sitename}/${CATEGORIES}/`).json(),
}

export default people
