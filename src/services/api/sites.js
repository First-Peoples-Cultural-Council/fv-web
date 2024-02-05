import { apiBase } from 'services/config'
import { SITES } from 'common/constants'

const site = {
  get: async ({ sitename }) => apiBase().get(`${SITES}/${sitename}/`).json(),
  getAll: async () => apiBase().get(SITES).json(),
  update: async ({ sitename, properties }) =>
    apiBase().put(`${SITES}/${sitename}/`, { json: properties }).json(),
  partialUpdate: async ({ sitename, properties }) =>
    apiBase().patch(`${SITES}/${sitename}/`, { json: properties }).json(),
}

export default site
