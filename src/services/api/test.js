import { api } from 'services/config'

const test = {
  get: async () => api.get('url-goes-here', { prefixUrl: '' }).json(),
}

export default test
