import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import api from 'services/api'
import { SONGS, TYPE_SONG } from 'common/constants'

const formatSong = (result) => ({
  acknowledgement: result?.acknowledgements || [],
  audio: result?.relatedAudio || [],
  coverVisual: result?.coverImage || {},
  created: result?.created,
  excludeFromGames: result?.excludeFromGames,
  excludeFromKids: result?.excludeFromKids,
  hideOverlay: result?.hideOverlay,
  id: result?.id || '',
  introduction: result?.introduction || '',
  introductionTranslation: result?.introductionTranslation || '',
  lastModified: result?.lastModified,
  lyrics: result?.lyrics || [],
  notes: result?.notes || [],
  title: result?.title || '',
  titleTranslation: result?.titleTranslation || '',
  type: TYPE_SONG,
  url: result?.url,
  videos: result?.relatedVideos || [],
  pictures: result?.relatedImages || [],
})

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
    results: page?.results?.map((result) => formatSong(result)),
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
  const formattedSong = formatSong(response.data)
  return {
    ...response,
    data: formattedSong,
  }
}
