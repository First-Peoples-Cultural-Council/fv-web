import { apiBase } from 'services/config'
import { SITES, STORIES } from 'common/constants'

const stories = {
  getStory: async ({ sitename, id }) =>
    apiBase.get(`${SITES}/${sitename}/${STORIES}/${id}`).json(),
  getStories: async ({ sitename }) =>
    apiBase.get(`${SITES}/${sitename}/${STORIES}/`).json(),
}

export default stories
