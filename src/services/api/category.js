import { apiV1, apiBase } from 'services/config'
import { SITES, CATEGORIES } from 'common/constants'

const category = {
  get: async ({ sitename }) =>
    apiBase.get(`${SITES}/${sitename}/${CATEGORIES}/`).json,
  // get: async ({ siteId, parentsOnly = 'false', inUseOnly = 'false' }) =>
  //   apiV1
  //     .get(
  //       `category/${siteId}?parentsOnly=${parentsOnly}&inUseOnly=${inUseOnly}`,
  //     )
  //     .json(),
  updateParent: async ({ categoryId, parentCategoryId }) => {
    const body = {
      categoryId,
      parentCategoryId,
    }
    return apiV1.post('category/updateParent', { json: body }).json()
  },
}

export default category
