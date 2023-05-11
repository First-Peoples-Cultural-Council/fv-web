import { HEADER_ENRICHER } from 'common/constants'

import { apiV1 } from 'services/config'
import visibilityApi from 'services/api/visibility'
import { convertStateToVisibility } from 'common/utils/stringHelpers'

const create = async ({ parentId, name, docType, properties }) => {
  const body = {
    'entity-type': 'document',
    name,
    type: docType,
    properties: { ...properties, 'fv:modifiedv2': true },
  }
  return apiV1.post(`id/${parentId}`, { json: body }).json()
}

const update = async ({ id, properties }) => {
  const body = {
    'entity-type': 'document',
    uid: id,
    properties: { ...properties, 'fv:modifiedv2': true },
  }
  return apiV1.put(`id/${id}`, { json: body }).json()
}

const document = {
  get: async ({ id, properties = '*', contextParameters }) => {
    const enrichers = contextParameters
      ? `&${HEADER_ENRICHER}=${contextParameters}`
      : ''
    return apiV1.get(`id/${id}?properties=${properties}${enrichers}`).json()
  },
  setProperty: async ({ input, properties }) => {
    const body = {
      params: {
        properties,
        save: true,
      },
      input,
      context: {},
    }
    return apiV1.post('automation/Document.Update', { json: body }).json()
  },
  create,
  createAndSetVisibility: async ({
    parentId,
    name,
    docType,
    properties,
    visibility,
  }) => {
    const response = await create({ parentId, name, docType, properties })
    // send request to change visibility if different from New
    if (response?.uid && visibility !== 'team') {
      return visibilityApi.update({
        id: response?.uid,
        newVisibility: visibility,
      })
    }
    return response
  },
  update,
  updateAndSetVisibility: async ({ id, properties, visibility }) => {
    const response = await update({ id, properties })
    // send request to change visibility if different from current state
    if (
      response?.uid &&
      convertStateToVisibility(response?.state) !== visibility
    ) {
      return visibilityApi.update({
        id: response?.uid,
        newVisibility: visibility,
      })
    }
    return response
  },
  trash: async ({ id }) => {
    const body = {
      input: id,
    }
    return apiV1.post('automation/Document.Trash', { json: body }).json()
  },
}

export default document
