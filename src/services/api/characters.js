import { apiBase } from 'services/config'
import { CHARACTERS, SITES } from 'common/constants'

const characters = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${CHARACTERS}/${id}`).json(),
  getAll: async ({ sitename }) =>
    apiBase().get(`${SITES}/${sitename}/${CHARACTERS}/`).json(),
  partialUpdate: async ({ sitename, id, properties }) =>
    apiBase()
      .patch(`${SITES}/${sitename}/${CHARACTERS}/${id}`, { json: properties })
      .json(),
}

export default characters
