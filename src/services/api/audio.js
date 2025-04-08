import { apiBase } from 'services/config'
import { SITES, AUDIO_PATH } from 'common/constants'

const audio = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${AUDIO_PATH}/${id}`).json(),
  create: async ({ sitename, data }) =>
    apiBase().post(`${SITES}/${sitename}/${AUDIO_PATH}`, { body: data }).json(),
  partialUpdate: async ({ id, data, sitename }) =>
    apiBase()
      .patch(`${SITES}/${sitename}/${AUDIO_PATH}/${id}`, { json: data })
      .json(),
  delete: async ({ sitename, id }) =>
    apiBase().delete(`${SITES}/${sitename}/${AUDIO_PATH}/${id}`).json(),
}

export default audio
