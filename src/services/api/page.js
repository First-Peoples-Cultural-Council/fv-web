import { api } from 'services/config'

const page = {
  get: async (siteId, pageUrl) =>
    api.get(`pages/${siteId}?url=${pageUrl}`).json(),
  getPages: async (siteId) => api.get(`pages/${siteId}`).json(),
}

export default page
