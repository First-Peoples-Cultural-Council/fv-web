import { apiBase } from 'services/config'
import { SITES, DOCUMENT_PATH } from 'common/constants'

const documents = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${DOCUMENT_PATH}/${id}`).json(),
  partialUpdate: async ({ id, data, sitename }) =>
    apiBase()
      .patch(`${SITES}/${sitename}/${DOCUMENT_PATH}/${id}`, { json: data })
      .json(),
  delete: async ({ sitename, id }) =>
    apiBase().delete(`${SITES}/${sitename}/${DOCUMENT_PATH}/${id}`).json(),
}

export default documents
