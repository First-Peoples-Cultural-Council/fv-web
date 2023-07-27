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
}

export default widgets
