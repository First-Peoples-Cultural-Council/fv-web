import { apiBase } from 'services/config'
import { SITES, VIDEO_PATH } from 'common/constants'

const videos = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${VIDEO_PATH}/${id}`).json(),
  partialUpdate: async ({ id, data, sitename }) =>
    apiBase()
      .patch(`${SITES}/${sitename}/${VIDEO_PATH}/${id}`, { json: data })
      .json(),
  delete: async ({ sitename, id }) =>
    apiBase().delete(`${SITES}/${sitename}/${VIDEO_PATH}/${id}`).json(),
}

export default videos
