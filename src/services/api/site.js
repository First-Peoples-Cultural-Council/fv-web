import { apiBase } from 'services/config'
import { SITES, MY_SITES } from 'common/constants'

const site = {
  get: async ({ sitename }) => apiBase.get(`${SITES}/${sitename}/`).json(),
  getSites: async () => apiBase.get(SITES).json(),
  mySites: async () => apiBase.get(MY_SITES).json(),
}

export default site
