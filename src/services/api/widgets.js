import { apiBase } from 'services/config'
import { SITES, WIDGETS } from 'common/constants'

const widgets = {
  getWidget: async ({ sitename, id }) =>
    apiBase.get(`${SITES}/${sitename}/${WIDGETS}/${id}`).json(),
}

export default widgets
