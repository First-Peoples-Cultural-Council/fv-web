import { apiBase } from 'services/config'
import { SITES, STORIES } from 'common/constants'

const stories = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${STORIES}/${id}`).json(),
  getAll: async ({ sitename }) =>
    apiBase().get(`${SITES}/${sitename}/${STORIES}/`).json(),
}

export default stories
