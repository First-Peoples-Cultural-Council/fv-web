import GlobalConfiguration from 'src/GlobalConfiguration'
import { apiBase } from 'services/config'
import { SITES, AUDIO_PATH } from 'common/constants'
import { getPathForMediaType } from 'common/utils/mediaHelpers'

const media = {
  get: async ({ sitename, mediaType, id }) => {
    const mediaTypePath = getPathForMediaType(mediaType)
    return apiBase().get(`${SITES}/${sitename}/${mediaTypePath}/${id}`).json()
  },
  getUploadEndpoint: ({ sitename, mediaType }) => {
    const mediaTypePath = getPathForMediaType(mediaType)
    const url = new URL(
      `${SITES}/${sitename}/${mediaTypePath}`,
      GlobalConfiguration.API_URL,
    )
    return url.href
  },
  uploadAudio: async ({ sitename, data }) =>
    apiBase().post(`${SITES}/${sitename}/${AUDIO_PATH}`, { body: data }).json(),
  delete: async ({ sitename, id, mediaType }) => {
    const mediaTypePath = getPathForMediaType(mediaType)
    return apiBase()
      .delete(`${SITES}/${sitename}/${mediaTypePath}/${id}`)
      .json()
  },
  update: async ({ id, data, mediaType, sitename }) => {
    const mediaTypePath = getPathForMediaType(mediaType)
    return apiBase()
      .put(`${SITES}/${sitename}/${mediaTypePath}/${id}`, { json: data })
      .json()
  },
}

export default media
