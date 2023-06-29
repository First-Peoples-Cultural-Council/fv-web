import { apiV1, apiBase } from 'services/config'
import { SITES, CATEGORIES } from 'common/constants'

const category = {
  get: async ({ sitename }) =>
    apiBase.get(`${SITES}/${sitename}/${CATEGORIES}/`).json(),

  updateParent: async ({ categoryId, parentCategoryId }) => {
    const body = {
      categoryId,
      parentCategoryId,
    }
    return apiV1.post('category/updateParent', { json: body }).json()
  },
}

export default category
