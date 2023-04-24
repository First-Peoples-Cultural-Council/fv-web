import { api } from 'services/config'

const site = {
  get: async (sitename) => api.get(`site/${sitename}`).json(),
  getSites: async () => api.get('site').json(),
  mySites: async () => api.get('site?mySites=true').json(),
}

export default site
