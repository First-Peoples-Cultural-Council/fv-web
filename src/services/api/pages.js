import { apiBase } from 'services/config'
import { SITES, PAGES } from 'common/constants'

const pages = {
  getPage: async ({ sitename, pageSlug }) =>
    apiBase.get(`${SITES}/${sitename}/${PAGES}/${pageSlug}`).json(),
  create: async ({ sitename, properties }) => {
    apiBase.post(`${SITES}/${sitename}/${PAGES}/`, { json: properties }).json()
  },
  update: async ({ sitename, id, properties }) => {
    apiBase
      .put(`${SITES}/${sitename}/${PAGES}/${id}`, { json: properties })
      .json()
  },
  delete: async ({ sitename, pageSlug }) =>
    apiBase.delete(`${SITES}/${sitename}/${PAGES}/${pageSlug}`).json(),
  getPages: async ({ sitename }) =>
    apiBase.get(`${SITES}/${sitename}/${PAGES}/`).json(),
}

export default pages
