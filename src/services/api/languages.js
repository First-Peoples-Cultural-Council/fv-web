import { apiBase } from 'services/config'
import { LANGUAGES } from 'common/constants'

const languages = {
  get: async ({ id }) => apiBase().get(`${LANGUAGES}/${id}/`).json(),
  getAll: async ({ query }) => {
    const params = query ? `?q=${query}` : ''
    return apiBase().get(`${LANGUAGES}${params}/`).json()
  },
}

export default languages
