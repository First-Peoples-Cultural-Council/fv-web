import { apiV1 } from 'services/config'

const widget = {
  getWordOfTheDay: async ({ siteId }) =>
    apiV1.get(`word_of_the_day/${siteId}`).json(),
  getStats: async ({ siteId }) =>
    apiV1.get(`statistics/generate?siteId=${siteId}`).json(),
}

export default widget
