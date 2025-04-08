import { apiBase } from 'services/config'
import { SITES, IMAGE_PATH } from 'common/constants'

const images = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${IMAGE_PATH}/${id}`).json(),
  partialUpdate: async ({ id, data, sitename }) =>
    apiBase()
      .patch(`${SITES}/${sitename}/${IMAGE_PATH}/${id}`, { json: data })
      .json(),
  delete: async ({ sitename, id }) =>
    apiBase().delete(`${SITES}/${sitename}/${IMAGE_PATH}/${id}`).json(),
}

export default images
