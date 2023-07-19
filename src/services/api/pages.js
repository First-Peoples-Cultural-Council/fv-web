import { apiBase } from 'services/config'
import { SITES, PAGES } from 'common/constants'

const pages = {
  getPage: async ({ sitename, pageSlug }) =>
    apiBase.get(`${SITES}/${sitename}/${PAGES}/${pageSlug}`).json(),
  getPages: async ({ sitename }) =>
    apiBase.get(`${SITES}/${sitename}/${PAGES}/`).json(),
}

export default pages
