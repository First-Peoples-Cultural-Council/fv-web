import { apiBase } from 'services/config'
import { SITES, WIDGETS } from 'common/constants'

const widgets = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${WIDGETS}/${id}`).json(),
  getAll: async ({ sitename }) =>
    apiBase().get(`${SITES}/${sitename}/${WIDGETS}/`).json(),
  create: async ({ sitename, formData }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${WIDGETS}/`, { json: formData })
      .json(),
  update: async ({ sitename, widgetId, formData }) =>
    apiBase()
      .put(`${SITES}/${sitename}/${WIDGETS}/${widgetId}/`, { json: formData })
      .json(),
  delete: async ({ sitename, widgetId }) =>
    apiBase().delete(`${SITES}/${sitename}/${WIDGETS}/${widgetId}/`).json(),
}

export default widgets
