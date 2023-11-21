import { apiBase } from 'services/config'
import { SITES, STATS } from 'common/constants'

const stats = {
  get: async ({ sitename }) =>
    apiBase().get(`${SITES}/${sitename}/${STATS}/`).json(),
}

export default stats
