import { apiBase } from 'services/config'
import { SITES, WORDSY } from 'common/constants'

const gameContent = {
  getWordsyConfig: async ({ sitename, searchParams }) =>
    apiBase().get(`${SITES}/${sitename}/${WORDSY}/?${searchParams}`).json(),
}

export default gameContent
