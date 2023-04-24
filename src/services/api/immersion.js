import { HEADER_ENRICHER } from 'common/constants'

import { api } from 'services/config'

const immersion = {
  get: async (labelDictionaryId) => {
    const bodyObject = {
      params: {
        language: 'NXQL',
        sortBy: 'fvlabel:labelKey',
        sortOrder: 'asc',
        query: `SELECT * FROM FVLabel WHERE ecm:parentId = '${labelDictionaryId}' AND ecm:isVersion = 0 AND ecm:isTrashed = 0`,
      },
      context: {},
    }
    const headers = { [HEADER_ENRICHER]: 'label', properties: '*' }
    return api
      .post('automation/Document.EnrichedQuery', { json: bodyObject, headers })
      .json()
  },
}

export default immersion
