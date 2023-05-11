import { apiV1 } from 'services/config'

const widget = {
  getWordOfTheDay: async ({ siteId }) =>
    apiV1.get(`word_of_the_day/${siteId}`).json(),
  getStats: async ({ siteId }) =>
    apiV1.get(`statistics/generate?siteId=${siteId}`).json(),
  getWidgets: async ({ siteId }) => {
    const body = {
      params: {
        language: 'NXQL',
        sortOrder: 'ASC',
        currentPageIndex: '0',
        maxResults: '1000',
        pageSize: '100',
        query: `SELECT ecm:uuid, ecm:name, widget:type, widget:format FROM FVWidget WHERE ecm:ancestorId = '${siteId}' AND ecm:isTrashed = 0 AND ecm:isVersion = 0`,
        sortBy: 'widget:type',
      },
      context: {},
    }
    return apiV1
      .post('automation/Repository.ResultSetQuery', { json: body })
      .json()
  },
}

export default widget
