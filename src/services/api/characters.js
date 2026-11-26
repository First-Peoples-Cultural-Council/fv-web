import { apiBase } from 'services/config'
import { CHARACTERS, PAGE, PAGE_SIZE, SITES } from 'common/constants'

const characters = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${CHARACTERS}/${id}`).json(),
  getAll: async ({ sitename, pageParam, perPage = 250 }) =>
    apiBase()
      .get(
        `${SITES}/${sitename}/${CHARACTERS}/?${PAGE}=${pageParam}&${PAGE_SIZE}=${perPage}`,
      )
      .json(),
  partialUpdate: async ({ sitename, id, properties }) =>
    apiBase()
      .patch(`${SITES}/${sitename}/${CHARACTERS}/${id}`, { json: properties })
      .json(),
}

export default characters
