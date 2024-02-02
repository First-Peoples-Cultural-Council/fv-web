import { apiBase } from 'services/config'
import { LANGUAGES } from 'common/constants'

const languages = {
  get: async ({ id }) => apiBase().get(`${LANGUAGES}/${id}/`).json(),
  getAll: async ({ query }) =>
    apiBase()
      .get(`${LANGUAGES}?page=1&pageSize=100${query ? `&q=${query}` : ''}`)
      .json(),
}

export default languages
