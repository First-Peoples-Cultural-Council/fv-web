import { apiV1 } from 'services/config'
import { HEADER_ENRICHER } from 'common/constants'

const gameContent = {
  get: async ({ siteId, pageParam, perPage = 100 }) => {
    const body = {
      params: {
        currentPageIndex: `${pageParam}`,
        language: 'NXQL',
        pageSize: `${perPage}`,
        query: `SELECT * FROM FVWord WHERE ecm:ancestorId = '${siteId}' AND fv:related_audio/* IS NOT NULL AND ecm:isVersion = 0 AND ecm:isTrashed = 0`,
        maxResults: '100',
        sortOrder: 'DESC',
        sortBy: 'dc:created',
      },
      context: {},
    }
    const headers = { [HEADER_ENRICHER]: 'ancestory,word', properties: '*' }
    return apiV1
      .post('automation/Document.EnrichedQuery', { json: body, headers })
      .json()
  },
}

export default gameContent
