import { apiBase } from 'services/config'
import { SITES, SONGS } from 'common/constants'

const song = {
  getSongs: async ({ sitename }) =>
    apiBase.get(`${SITES}/${sitename}/${SONGS}/`).json(),

  getSong: async ({ sitename, id }) =>
    apiBase.get(`${SITES}/${sitename}/${SONGS}/${id}`).json(),
}

export default song
