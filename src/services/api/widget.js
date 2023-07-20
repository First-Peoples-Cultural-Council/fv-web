import { apiV1 } from 'services/config'

// THIS FILE IS DEPRECATED - please use services/api/widgets for new fv-be widget apis
const widget = {
  getWordOfTheDay: async ({ siteId }) =>
    apiV1.get(`word_of_the_day/${siteId}`).json(),
  getStats: async ({ siteId }) =>
    apiV1.get(`statistics/generate?siteId=${siteId}`).json(),
}

export default widget
