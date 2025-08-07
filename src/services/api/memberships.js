import { apiBase } from 'services/config'
import { SITES, MEMBERSHIPS, PAGE, PAGE_SIZE } from 'common/constants'

const memberships = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${MEMBERSHIPS}/${id}`).json(),
  getAll: async ({ sitename, pageParam, perPage = 48 }) =>
    apiBase()
      .get(
        `${SITES}/${sitename}/${MEMBERSHIPS}/?${PAGE}=${pageParam}&${PAGE_SIZE}=${perPage}`,
      )
      .json(),
  partialUpdate: async ({ sitename, id, properties }) =>
    apiBase()
      .patch(`${SITES}/${sitename}/${MEMBERSHIPS}/${id}`, { json: properties })
      .json(),
  delete: async ({ sitename, id }) =>
    apiBase().delete(`${SITES}/${sitename}/${MEMBERSHIPS}/${id}`).json(),
}

export default memberships
