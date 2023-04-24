import { api } from 'services/config'

const user = {
  get: async () => api.get('me/').json(),
  getMySites: async () => api.get('site/?mySites=true').json(),
  getRoles: async () => api.get('me/@dashboard').json(),
  getSiteDocuments: async () =>
    api
      .post('automation/FVGetDialectsForUser', {
        json: {},
        headers: { properties: '*' },
      })
      .json(),
}

export default user
