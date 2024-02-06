import { apiBase } from 'services/config'
import { MY_SITES } from 'common/constants'

const mySites = {
  get: async () => apiBase().get(MY_SITES).json(),
}

export default mySites
