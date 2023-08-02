import { apiBase } from 'services/config'
import { SITES, SONGS } from 'common/constants'

const song = {
  getSongs: async ({ sitename }) =>
    apiBase.get(`${SITES}/${sitename}/${SONGS}/`).json(),

  getSong: async ({ sitename, id }) =>
    apiBase.get(`${SITES}/${sitename}/${SONGS}/${id}`).json(),
  // get: async ({ siteId, searchParams, pageParam, perPage = 48 }) => {
  //   const response = await apiV1
  //     .get(
  //       `songs/${siteId}?${searchParams}&page=${pageParam}&perPage=${perPage}`,
  //     )
  //     .json()
  //   const lastPage = Math.ceil(
  //     (response?.statistics?.resultCount || 0) / perPage,
  //   )
  //   const nextPage = pageParam >= lastPage ? undefined : pageParam + 1
  //   return { ...response, nextPage, lastPage }
  // },
}

export default song
