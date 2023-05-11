import { apiV1 } from 'services/config'

const page = {
  get: async (siteId, pageUrl) =>
    apiV1.get(`pages/${siteId}?url=${pageUrl}`).json(),
  getPages: async (siteId) => apiV1.get(`pages/${siteId}`).json(),
}

export default page
