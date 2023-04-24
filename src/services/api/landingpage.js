import { api } from 'services/config'
import { HEADER_ENRICHER } from 'common/constants'

const landingPage = {
  getPage: async () => {
    const body = {
      params: {
        language: 'NXQL',
        currentPageIndex: '0',
        query:
          "SELECT * FROM DOCUMENT WHERE ecm:isTrashed = 0 AND ecm:isVersion = 0 AND ecm:primaryType = 'FVPage' AND ecm:path = '/FV/Workspaces/Site/Resources/Pages/FirstVoices Homepage'",
      },
      context: {},
    }
    const headers = { [HEADER_ENRICHER]: 'ancestory', properties: '*' }
    return api
      .post('automation/Document.EnrichedQuery', { json: body, headers })
      .json()
  },
}

export default landingPage
