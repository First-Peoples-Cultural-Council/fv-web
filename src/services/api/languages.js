import { apiBase } from 'services/config'
import { LANGUAGES } from 'common/constants'

const languages = {
  get: async ({ id }) => apiBase().get(`${LANGUAGES}/${id}/`).json(),
  getAll: async ({ query, explorable }) => {
    const _query = query ? `&q=${query}` : ''
    const _explorable = explorable ? `&explorable=true` : ''
    return apiBase()
      .get(`${LANGUAGES}?page=1&pageSize=100${_query}${_explorable}`)
      .json()
  },
}

export default languages
