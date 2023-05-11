import { HEADER_ENRICHER } from 'common/constants'
import { apiV1 } from 'services/config'

const gallery = {
  get: async (galleryId) =>
    apiV1
      .get(`id/${galleryId}?properties=dublincore&${HEADER_ENRICHER}=gallery`)
      .json(),
  getAll: async (siteId) => {
    const bodyObject = {
      params: {
        language: 'NXQL',
        query: `SELECT * FROM FVGallery WHERE fva:dialect = '${siteId}' AND ecm:isVersion = 0 AND ecm:isTrashed = 0 ORDER BY dc:title`,
      },
      context: {},
    }
    const headers = { [HEADER_ENRICHER]: 'gallery', properties: 'dublincore' }
    return apiV1
      .post('automation/Document.EnrichedQuery', { json: bodyObject, headers })
      .json()
  },
}

export default gallery
