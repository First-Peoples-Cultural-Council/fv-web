import { apiBase } from 'services/config'
import { SITES, IMMERSION_LABELS } from 'common/constants'

const immersionLabels = {
  get: async ({ sitename, key }) =>
    apiBase().get(`${SITES}/${sitename}/${IMMERSION_LABELS}/${key}`).json(),
  getAll: async ({ sitename }) =>
    apiBase().get(`${SITES}/${sitename}/${IMMERSION_LABELS}/`).json(),
  getMapped: async ({ sitename }) =>
    apiBase().get(`${SITES}/${sitename}/${IMMERSION_LABELS}/all/`).json(),
  create: async ({ sitename, properties }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${IMMERSION_LABELS}/`, { json: properties })
      .json(),
  partialUpdate: async ({ sitename, key, properties }) =>
    apiBase()
      .patch(`${SITES}/${sitename}/${IMMERSION_LABELS}/${key}`, {
        json: properties,
      })
      .json(),
  delete: async ({ sitename, key }) =>
    apiBase().delete(`${SITES}/${sitename}/${IMMERSION_LABELS}/${key}`).json(),
}

export default immersionLabels
