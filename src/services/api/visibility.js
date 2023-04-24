import { HEADER_ENRICHER } from 'common/constants'

import { api } from 'services/config'

const visibility = {
  update: async ({ id, newVisibility }) => {
    const bodyObject = {
      params: {
        visibility: newVisibility,
      },
      input: id,
      context: {},
    }
    const headers = {
      [HEADER_ENRICHER]: 'ancestry,permissions',
      properties: '*',
    }
    return api
      .post('automation/Document.UpdateVisibilityOperation', {
        json: bodyObject,
        headers,
      })
      .json()
  },
}

export default visibility
