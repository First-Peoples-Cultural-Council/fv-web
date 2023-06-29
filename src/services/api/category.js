import { apiBase } from 'services/config'
import { SITES, CATEGORIES } from 'common/constants'

const category = {
  get: async ({ sitename }) =>
    apiBase.get(`${SITES}/${sitename}/${CATEGORIES}/`).json(),
}

export default category
