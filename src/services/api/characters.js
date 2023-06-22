import { apiBase } from 'services/config'
import { CHARACTERS, SITES } from 'common/constants'

const characters = {
  get: async ({ sitename }) =>
    apiBase.get(`${SITES}/${sitename}/${CHARACTERS}/`).json(),
}

export default characters
