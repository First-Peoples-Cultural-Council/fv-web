import { apiBase } from 'services/config'
import { SITES, JOIN_REQUESTS } from 'common/constants'

const joinRequests = {
  getJoinRequests: async ({ sitename, pageParam, perPage = 48 }) =>
    apiBase()
      .get(
        `${SITES}/${sitename}/${JOIN_REQUESTS}/?page=${pageParam}&pageSize=${perPage}`,
      )
      .json(),
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${JOIN_REQUESTS}/${id}`).json(),
  create: async ({ sitename, properties }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${JOIN_REQUESTS}/`, { json: properties })
      .json(),
  approve: async ({ sitename, id, properties }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${JOIN_REQUESTS}/${id}/approve/`, {
        json: properties,
      })
      .json(),
  ignore: async ({ sitename, id }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${JOIN_REQUESTS}/${id}/ignore/`)
      .json(),
  reject: async ({ sitename, id }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${JOIN_REQUESTS}/${id}/reject/`)
      .json(),
  delete: async ({ sitename, id }) =>
    apiBase().delete(`${SITES}/${sitename}/${JOIN_REQUESTS}/${id}`).json(),
}

export default joinRequests
