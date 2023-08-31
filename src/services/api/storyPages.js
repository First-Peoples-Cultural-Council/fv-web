import { apiBase } from 'services/config'
import { SITES, STORIES, STORY_PAGES } from 'common/constants'

const stories = {
  get: async ({ sitename, storyId, id }) =>
    apiBase()
      .get(`${SITES}/${sitename}/${STORIES}/${storyId}/${STORY_PAGES}/${id}/`)
      .json(),
  getAll: async ({ sitename, storyId }) =>
    apiBase()
      .get(`${SITES}/${sitename}/${STORIES}/${storyId}/${STORY_PAGES}/`)
      .json(),
  create: async ({ sitename, storyId, properties }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${STORIES}/${storyId}/${STORY_PAGES}/`, {
        json: properties,
      })
      .json(),
  update: async ({ sitename, storyId, id, properties }) =>
    apiBase()
      .put(`${SITES}/${sitename}/${STORIES}/${storyId}/${STORY_PAGES}/${id}/`, {
        json: properties,
      })
      .json(),
  partialUpdate: async ({ sitename, storyId, id, properties }) =>
    apiBase()
      .patch(
        `${SITES}/${sitename}/${STORIES}/${storyId}/${STORY_PAGES}/${id}/`,
        {
          json: properties,
        },
      )
      .json(),
  delete: async ({ sitename, storyId, id }) =>
    apiBase()
      .delete(
        `${SITES}/${sitename}/${STORIES}/${storyId}/${STORY_PAGES}/${id}/`,
      )
      .json(),
}

export default stories
