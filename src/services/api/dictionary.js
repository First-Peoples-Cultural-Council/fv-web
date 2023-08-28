import { apiBase } from 'services/config'
import { DICTIONARY, SITES } from 'common/constants'

const dictionary = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${DICTIONARY}/${id}`).json(),
  create: async ({ sitename, properties }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${DICTIONARY}/`, { json: properties })
      .json(),
  update: async ({ sitename, id, properties }) =>
    apiBase()
      .put(`${SITES}/${sitename}/${DICTIONARY}/${id}`, { json: properties })
      .json(),
  delete: async ({ sitename, id }) =>
    apiBase().delete(`${SITES}/${sitename}/${DICTIONARY}/${id}`).json(),
}

export default dictionary
