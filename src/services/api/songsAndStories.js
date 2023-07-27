import { apiBase } from 'services/config'
import { SITES, SONGS } from 'common/constants'

const songsAndStories = {
  get: async ({ sitename }) =>
    apiBase.get(`${SITES}/${sitename}/${SONGS}`).json(),
  // get: async ({ siteId, searchParams, pageParam, perPage = 20 }) => {
  //   const response = await apiV1
  //     .get(
  //       `songs_and_stories/${siteId}?${searchParams}&page=${pageParam}&perPage=${perPage}`,
  //     )
  //     .json()
  //   const lastPage = Math.ceil(
  //     (response?.statistics?.resultCount || 0) / perPage,
  //   )
  //   const nextPage = pageParam >= lastPage ? undefined : pageParam + 1
  //   return { ...response, nextPage, lastPage }
  // },
}

export default songsAndStories
