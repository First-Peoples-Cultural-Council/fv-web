import { apiBase } from 'services/config'
import { SITES, WIDGETS, WORD_OF_THE_DAY } from 'common/constants'

const widgets = {
  getWidget: async ({ sitename, id }) =>
    apiBase.get(`${SITES}/${sitename}/${WIDGETS}/${id}`).json(),
  getWidgets: async ({ sitename }) =>
    apiBase.get(`${SITES}/${sitename}/${WIDGETS}/`).json(),
  getWordOfTheDay: async ({ sitename }) =>
    apiBase.get(`${SITES}/${sitename}/${WORD_OF_THE_DAY}/`).json(),
  getStats: async ({ sitename }) => ({
    message: `Stats API placeholder for ${sitename}`,
  }),
  create: async ({ sitename, formData }) =>
    apiBase.post(`${SITES}/${sitename}/${WIDGETS}/`, { json: formData }).json(),
  updateCompleteWidget: async ({ sitename, widgetId, formData }) =>
    apiBase
      .put(`${SITES}/${sitename}/${WIDGETS}/${widgetId}/`, { json: formData })
      .json(),
  delete: async ({ sitename, widgetId }) =>
    apiBase.delete(`${SITES}/${sitename}/${WIDGETS}/${widgetId}/`).json(),
}

export default widgets
