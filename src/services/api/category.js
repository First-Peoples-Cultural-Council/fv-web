import { api } from 'services/config'

const category = {
  get: async ({ siteId, parentsOnly = 'false', inUseOnly = 'false' }) =>
    api
      .get(
        `category/${siteId}?parentsOnly=${parentsOnly}&inUseOnly=${inUseOnly}`,
      )
      .json(),
  updateParent: async ({ categoryId, parentCategoryId }) => {
    const body = {
      categoryId,
      parentCategoryId,
    }
    return api.post('category/updateParent', { json: body }).json()
  },
}

export default category
