import { apiBase } from 'services/config'
import { SITES, CONTACT_US } from 'common/constants'

const mail = {
  post: async ({ sitename, properties }) =>
    apiBase()
      .post(`${SITES}/${sitename}/${CONTACT_US}/`, { json: properties })
      .json(),
  get: async ({ sitename }) =>
    apiBase().get(`${SITES}/${sitename}/${CONTACT_US}/`).json(),
}

export default mail
