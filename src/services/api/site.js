import { apiV1 } from 'services/config'

const site = {
  get: async (sitename) => apiV1.get(`site/${sitename}`).json(),
  getSites: async () => apiV1.get('site').json(),
  mySites: async () => apiV1.get('site?mySites=true').json(),
}

export default site
