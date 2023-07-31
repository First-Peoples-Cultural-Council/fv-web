import { apiBase } from 'services/config'
import { SITES, PEOPLE } from 'common/constants'

const people = {
  get: async ({ sitename, id }) =>
    apiBase.get(`${SITES}/${sitename}/${PEOPLE}/${id}`).json(),
  create: async ({ sitename, properties }) => {
    const body = {
      name: properties?.name,
      bio: properties?.bio,
    }
    return apiBase
      .post(`${SITES}/${sitename}/${PEOPLE}/`, { json: body })
      .json()
  },
  update: async ({ sitename, id, properties }) => {
    const body = {
      name: properties?.name || null,
      bio: properties?.bio || null,
    }
    return apiBase
      .put(`${SITES}/${sitename}/${PEOPLE}/${id}`, { json: body })
      .json()
  },
  delete: async ({ sitename, id }) =>
    apiBase.delete(`${SITES}/${sitename}/${PEOPLE}/${id}`).json(),
  getAll: async ({ sitename }) =>
    apiBase.get(`${SITES}/${sitename}/${PEOPLE}/`).json(),
}

export default people
