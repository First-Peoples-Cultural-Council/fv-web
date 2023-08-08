import GlobalConfiguration from 'src/GlobalConfiguration'
import { apiBase, apiV1 } from 'services/config'
import { SITES, AUDIO_PATH, IMAGE_PATH, VIDEO_PATH } from 'common/constants'

const media = {
  get: async ({ sitename, docType, pageParam, perPage = 24 }) => {
    // Get list of media files of specified type for given site
    const response = await apiBase
      .get(
        `${SITES}/${sitename}/${docType}/?page=${pageParam}&pageSize=${perPage}`,
      )
      .json()
    const lastPage = response?.previous
    const nextPage = response?.next
    return { ...response, nextPage, lastPage }
  },
  getAudio: async ({ sitename, id }) =>
    apiBase.get(`${SITES}/${sitename}/${AUDIO_PATH}/${id}`).json(),
  getImage: async ({ sitename, id }) =>
    apiBase.get(`${SITES}/${sitename}/${IMAGE_PATH}/${id}`).json(),
  getVideo: async ({ sitename, id }) =>
    apiBase.get(`${SITES}/${sitename}/${VIDEO_PATH}/${id}`).json(),
  getMediaDocument: async ({ sitename, docId, docType }) =>
    apiBase.get(`${SITES}/${sitename}/${docType}/${docId}`).json(),
  getS3Url: async () =>
    apiV1.post('media_upload/generate_urls', { json: { quantity: 1 } }).json(),
  getUploadEndpoint: (sitename, docType) =>
    `${GlobalConfiguration.API_URL}${SITES}/${sitename}/${docType}`,
}

export default media
