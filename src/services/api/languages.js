import { apiBase } from 'services/config'
import { LANGUAGES } from 'common/constants'

const languages = {
  get: async ({ id }) => apiBase().get(`${LANGUAGES}/${id}/`).json(),
  getAll: async ({ query }) => {
    const _query = query ? `&q=${query}` : ''
    return apiBase().get(`${LANGUAGES}?page=1&pageSize=100${_query}`).json()
  },
}

export default languages
