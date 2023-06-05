import { apiV1, apiBase } from 'services/config'
import { SITES } from 'common/constants'

const site = {
  get: async () => {
    const response = await apiBase.get(SITES).json()
    return response
  },
  getSites: async () => apiBase.get(SITES).json(),
  mySites: async () => apiV1.get('site?mySites=true').json(),
}

export default site
