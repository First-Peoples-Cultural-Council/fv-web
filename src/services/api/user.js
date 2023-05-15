import { apiV1 } from 'services/config'

const user = {
  get: async () => apiV1.get('me/').json(),
  getMySites: async () => apiV1.get('site/?mySites=true').json(),
  getRoles: async () => apiV1.get('me/@dashboard').json(),
  getSiteDocuments: async () =>
    apiV1
      .post('automation/FVGetDialectsForUser', {
        json: {},
        headers: { properties: '*' },
      })
      .json(),
}

export default user
