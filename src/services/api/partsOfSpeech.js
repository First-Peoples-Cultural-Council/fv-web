// FPCC
import { apiBase } from 'services/config'
import { PARTS_OF_SPEECH } from 'common/constants'

const partsOfSpeech = {
  get: async () => apiBase.get(PARTS_OF_SPEECH).json(),
}

export default partsOfSpeech
