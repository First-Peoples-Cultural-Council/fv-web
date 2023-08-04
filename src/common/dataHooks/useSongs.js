import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import api from 'services/api'
import { SONGS } from 'common/constants'
import { songDetailAdaptor } from 'common/dataAdaptors/songAdaptors'

export function useSongs() {
  const { sitename } = useParams()

  const allSongsResponse = useInfiniteQuery(
    [SONGS, sitename],
    ({ pageParam = 1 }) =>
      api.song.getSongs({
        sitename,
        pageParam,
      }),
    {
      // The query will not execute until the sitename exists
      enabled: !!sitename,
    },
  )
  const formattedResponse = allSongsResponse?.data?.pages?.map((page) => ({
    results: page?.results?.map((result) =>
      songDetailAdaptor({ item: result }),
    ),
  }))

  return {
    ...allSongsResponse,
    data: formattedResponse,
  }
}

export function useSong({ id }) {
  const { sitename } = useParams()
  const response = useQuery(
    [SONGS, sitename, id],
    () => api.song.getSong({ sitename, id }),
    {
      // The query will not execute until the sitename exists
      enabled: !!id,
    },
  )
  const formattedSong = songDetailAdaptor({ item: response?.data })
  return {
    ...response,
    data: formattedSong,
  }
}
