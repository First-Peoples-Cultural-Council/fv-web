import { externalApi } from 'services/config'

const blog = {
  get: async (rssFeed) => externalApi.get(rssFeed).json(),
}

export default blog
