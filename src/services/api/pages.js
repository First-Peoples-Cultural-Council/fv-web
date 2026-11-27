import { apiBase } from 'services/config'
import { SITES, PAGE, PAGES, PAGE_SIZE } from 'common/constants'

const pages = {
  get: async ({ sitename, slug }) =>
    apiBase().get(`${SITES}/${sitename}/${PAGES}/${slug}`).json(),
  getAll: async ({ sitename, pageParam, perPage = 48 }) =>
    apiBase()
      .get(
        `${SITES}/${sitename}/${PAGES}/?${PAGE}=${pageParam}&${PAGE_SIZE}=${perPage}`,
      )
      .json(),
  create: async ({ sitename, properties }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${PAGES}/`, { json: properties })
      .json(),
  update: async ({ sitename, slug, properties }) =>
    apiBase()
      .put(`${SITES}/${sitename}/${PAGES}/${slug}`, { json: properties })
      .json(),
  partialUpdate: async ({ sitename, slug, properties }) =>
    apiBase()
      .patch(`${SITES}/${sitename}/${PAGES}/${slug}`, { json: properties })
      .json(),
  delete: async ({ sitename, slug }) =>
    apiBase().delete(`${SITES}/${sitename}/${PAGES}/${slug}`).json(),
}

export default pages
