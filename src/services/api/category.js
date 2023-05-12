import { apiV1 } from 'services/config'

const category = {
  get: async ({ siteId, parentsOnly = 'false', inUseOnly = 'false' }) =>
    apiV1
      .get(
        `category/${siteId}?parentsOnly=${parentsOnly}&inUseOnly=${inUseOnly}`,
      )
      .json(),
  updateParent: async ({ categoryId, parentCategoryId }) => {
    const body = {
      categoryId,
      parentCategoryId,
    }
    return apiV1.post('category/updateParent', { json: body }).json()
  },
}

export default category
