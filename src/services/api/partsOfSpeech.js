// FPCC
import { apiBase } from 'services/config'
import { PARTS_OF_SPEECH } from 'common/constants'

const partsOfSpeech = {
  get: async () => {
    const response = await apiBase.get(PARTS_OF_SPEECH).json()
    return response
  },
}

export default partsOfSpeech
