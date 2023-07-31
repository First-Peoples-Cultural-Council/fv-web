import { apiBase } from 'services/config'
import { SITES, PEOPLE } from 'common/constants'

const people = {
  get: async ({ sitename, id }) =>
    apiBase.get(`${SITES}/${sitename}/${PEOPLE}/${id}`).json(),
  create: async ({ sitename }) =>
    apiBase.post(`${SITES}/${sitename}/${PEOPLE}/`).json(),
  update: async ({ sitename, id }) =>
    apiBase.put(`${SITES}/${sitename}/${PEOPLE}/${id}`).json(),
  delete: async ({ sitename, id }) =>
    apiBase.delete(`${SITES}/${sitename}/${PEOPLE}/${id}`).json(),
  getAll: async ({ sitename }) =>
    apiBase.get(`${SITES}/${sitename}/${PEOPLE}/`).json(),
}

export default people
