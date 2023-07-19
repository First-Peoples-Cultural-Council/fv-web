import { apiBase } from 'services/config'
import { SITES, WIDGETS } from 'common/constants'

const widgets = {
  getWidget: async ({ sitename, id }) =>
    apiBase.get(`${SITES}/${sitename}/${WIDGETS}/${id}`).json(),
  getWidgets: async ({ sitename }) =>
    apiBase.get(`${SITES}/${sitename}/${WIDGETS}/`).json(),
}

export default widgets
