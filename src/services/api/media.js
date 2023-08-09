import { apiBase, apiV1, externalApi } from 'services/config'
import { SITES, AUDIO_PATH, IMAGE_PATH, VIDEO_PATH } from 'common/constants'

const media = {
  getAudio: async ({ sitename, id }) =>
    apiBase.get(`${SITES}/${sitename}/${AUDIO_PATH}/${id}`).json(),
  getImage: async ({ sitename, id }) =>
    apiBase.get(`${SITES}/${sitename}/${IMAGE_PATH}/${id}`).json(),
  getVideo: async ({ sitename, id }) =>
    apiBase.get(`${SITES}/${sitename}/${VIDEO_PATH}/${id}`).json(),
  get: async ({ sitename, docType, pageParam, perPage = 24 }) => {
    const response = await apiBase
      .get(
        `${SITES}/${sitename}/${docType}/?page=${pageParam}&pageSize=${perPage}`,
      )
      .json()
    const lastPage = response?.previous
    const nextPage = response?.next
    return { ...response, nextPage, lastPage }
  },
  getMediaDocument: async ({ sitename, docId, docType }) =>
    apiBase.get(`${SITES}/${sitename}/${docType}/${docId}`).json(),
  getS3Url: async () =>
    apiV1.post('media_upload/generate_urls', { json: { quantity: 1 } }).json(),
  upload: async ({ s3Url, file }) => externalApi.put(s3Url, { body: file }),
  markComplete: async ({
    acknowledgement,
    filename,
    notes,
    dialectId,
    speaker,
    title,
    url,
  }) => {
    const body = {
      name: filename,
      dialectId,
      url,
      title,
      notes,
      acknowledgement,
      speaker: speaker || [],
    }
    return apiV1.post('media_upload/mark_complete', { json: body }).json()
  },
}

export default media
