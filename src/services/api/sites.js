import { apiBase } from 'services/config'
import { PAGE, PAGE_SIZE, SITES } from 'common/constants'

const site = {
  get: async ({ sitename }) => apiBase().get(`${SITES}/${sitename}/`).json(),
  getAll: async ({ page = 1, pageSize = 100 }) =>
    apiBase().get(`${SITES}?${PAGE}=${page}&${PAGE_SIZE}=${pageSize}`).json(),
  update: async ({ sitename, properties }) =>
    apiBase().put(`${SITES}/${sitename}/`, { json: properties }).json(),
  partialUpdate: async ({ sitename, properties }) =>
    apiBase().patch(`${SITES}/${sitename}/`, { json: properties }).json(),
}

export default site
