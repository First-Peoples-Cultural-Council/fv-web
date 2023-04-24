import { api } from 'services/config'

const alphabet = {
  get: async (siteId) => api.get(`alphabet/${siteId}`).json(),
}

export default alphabet
