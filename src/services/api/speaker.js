import { HEADER_ENRICHER, DOC_SPEAKER } from 'common/constants'
import { api } from 'services/config'

const speakers = {
  get: async (speakersId) =>
    api.get(`id/${speakersId}?properties=*&${HEADER_ENRICHER}=speakers`).json(),
  getAll: async ({ siteId }) => {
    const bodyObject = {
      params: {
        language: 'NXQL',
        query: `SELECT * FROM ${DOC_SPEAKER} WHERE fva:dialect = '${siteId}' AND ecm:isVersion = 0 AND ecm:isTrashed = 0 ORDER BY dc:title`,
      },
      context: {},
    }
    const headers = { [HEADER_ENRICHER]: 'ancestry', properties: '*' }
    return api
      .post('automation/Document.EnrichedQuery', { json: bodyObject, headers })
      .json()
  },
}

export default speakers
