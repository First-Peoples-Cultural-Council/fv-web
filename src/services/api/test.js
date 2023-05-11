import { apiV1 } from 'services/config'

const test = {
  get: async () => apiV1.get('url-goes-here', { prefixUrl: '' }).json(),
}

export default test
