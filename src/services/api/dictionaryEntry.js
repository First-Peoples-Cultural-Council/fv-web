import { apiBase } from 'services/config'
import { DICTIONARY, SITES } from 'common/constants'

const dictionaryEntry = {
  get: async ({ sitename, id }) =>
    apiBase.get(`${SITES}/${sitename}/${DICTIONARY}/${id}`).json(),
}

export default dictionaryEntry
