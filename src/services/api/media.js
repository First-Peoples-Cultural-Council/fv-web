import { api, externalApi } from 'services/config'
import { cleanNXQL } from 'common/utils/stringHelpers'
import { HEADER_ENRICHER } from 'common/constants'

const media = {
  get: async ({ searchTerm, siteId, type, pageParam, perPage = 24 }) => {
    const search = searchTerm
      ? `AND  (dc:title ILIKE '%${cleanNXQL(
          searchTerm,
        )}%' OR dc:description ILIKE '%${cleanNXQL(searchTerm)}%')`
      : ''
    const body = {
      params: {
        currentPageIndex: `${pageParam}`,
        language: 'NXQL',
        pageSize: `${perPage}`,
        query: `SELECT * FROM ${type} WHERE ecm:ancestorId = '${siteId}' AND ecm:isVersion = 0 AND ecm:isTrashed = 0 ${search}`,
        maxResults: '300',
        sortOrder: searchTerm ? 'ASC' : 'DESC',
        sortBy: searchTerm ? 'ecm:name' : 'dc:created',
      },
      context: {},
    }
    const headers = { [HEADER_ENRICHER]: 'ancestory,media', properties: '*' }
    const response = await api
      .post('automation/Document.EnrichedQuery', { json: body, headers })
      .json()
    const lastPage = Math.ceil((response?.resultsCount || 0) / perPage)
    const nextPage = pageParam >= lastPage ? undefined : pageParam + 1
    return { ...response, nextPage, lastPage }
  },
  getS3Url: async () =>
    api.post('media_upload/generate_urls', { json: { quantity: 1 } }).json(),
  upload: async ({ s3Url, file }) => externalApi.put(s3Url, { body: file }),
  markComplete: async ({
    acknowledgement,
    filename,
    notes,
    dialectId,
    speaker,
    title,
    url,
  }) => {
    const body = {
      name: filename,
      dialectId,
      url,
      title,
      notes,
      acknowledgement,
      speaker: speaker || [],
    }
    return api.post('media_upload/mark_complete', { json: body }).json()
  },
}

export default media
