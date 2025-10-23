import { apiBase } from 'services/config'
import { SITES, WIDGETS } from 'common/constants'

const widgets = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${WIDGETS}/${id}`).json(),
  getAll: async ({ sitename }) =>
    apiBase().get(`${SITES}/${sitename}/${WIDGETS}/`).json(),
  create: async ({ sitename, properties }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${WIDGETS}/`, { json: properties })
      .json(),
  update: async ({ sitename, id, properties }) =>
    apiBase()
      .put(`${SITES}/${sitename}/${WIDGETS}/${id}/`, { json: properties })
      .json(),
  delete: async ({ sitename, id }) =>
    apiBase().delete(`${SITES}/${sitename}/${WIDGETS}/${id}/`).json(),
}

export default widgets
