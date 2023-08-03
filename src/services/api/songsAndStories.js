import { apiBase } from 'services/config'
import { SITES, SONGS } from 'common/constants'

const songsAndStories = {
  get: async ({ sitename }) =>
    apiBase.get(`${SITES}/${sitename}/${SONGS}`).json(),
}

export default songsAndStories
