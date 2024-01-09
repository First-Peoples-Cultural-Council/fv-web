import { apiBase } from 'services/config'
import { SITES, WORDSY } from 'common/constants'

const gameContent = {
  getWordsyConfig: async ({ sitename }) =>
    apiBase().get(`${SITES}/${sitename}/${WORDSY}`).json(),
}

export default gameContent
