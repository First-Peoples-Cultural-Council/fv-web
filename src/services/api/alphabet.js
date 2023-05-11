import { apiV1 } from 'services/config'

const alphabet = {
  get: async (siteId) => apiV1.get(`alphabet/${siteId}`).json(),
}

export default alphabet
