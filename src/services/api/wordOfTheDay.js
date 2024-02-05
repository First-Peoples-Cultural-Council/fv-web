import { apiBase } from 'services/config'
import { SITES, WORD_OF_THE_DAY } from 'common/constants'

const wordOfTheDay = {
  get: async ({ sitename }) =>
    apiBase().get(`${SITES}/${sitename}/${WORD_OF_THE_DAY}/`).json(),
}

export default wordOfTheDay
