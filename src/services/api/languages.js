import { apiBase } from 'services/config'
import { PAGE, PAGE_SIZE, LANGUAGES } from 'common/constants'

const languages = {
  get: async ({ id }) => apiBase().get(`${LANGUAGES}/${id}/`).json(),
  getAll: async ({ query, explorable }) => {
    const _query = query ? `&q=${query}` : ''
    const _explorable = explorable ? `&explorable=true` : ''
    return apiBase()
      .get(`${LANGUAGES}?${PAGE}=1&${PAGE_SIZE}=100${_query}${_explorable}`)
      .json()
  },
}

export default languages
