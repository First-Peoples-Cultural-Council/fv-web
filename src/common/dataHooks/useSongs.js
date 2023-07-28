import { useInfiniteQuery } from '@tanstack/react-query'
// import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import api from 'services/api'
import { SONGS } from 'common/constants'

export default function useSongs() {
  const { sitename } = useParams()
  console.log({ sitename })

  //   const _searchParams = `docType=${searchType}&kidsOnly=${kids}`

  const allSongsResponse = useInfiniteQuery(
    [SONGS, sitename],
    ({ pageParam = 1 }) =>
      api.song.get({
        sitename,
        //   searchParams: _searchParams,
        pageParam,
      }),
    {
      // The query will not execute until the sitename exists
      enabled: !!sitename,
    },
  )
  console.log({ allSongsResponse })
  const formattedResponse = allSongsResponse?.data?.pages?.map((page) => ({
    pages: page?.results?.map((result) => ({
      acknowledgements: result?.acknowledgements,
      coverImage: result?.coverImage,
      // .map((image) => ({
      //   acknowledgement: image.acknowledgement,
      //   description: image.description,
      //   excludeFromGames: image.excludeFromGames,
      //   excludeFromKids: image.excludeFromKids,
      //   id: image.id,
      //   isShared: image.isShared,
      //   title: image.title,
      //   url: image.url,
      // })),
      created: result?.created,
      excludeFromGames: result?.excludeFromGames,
      excludeFromKids: result?.excludeFromKids,
      hideOverlay: result?.hideOverlay,
      id: result?.id,
      introduction: result?.introduction,
      introductionTranslation: result?.introductionTranslation,
      lastModified: result?.lastModified,
      lyrics: result?.lyrics,
      //    .map((lyric) => ({
      //     id: lyric.id,
      //     text: lyric.text,
      //     translation: lyric.translation,
      //   })),
      notes: result?.notes,
      //   ?.map((note) => ({
      // note: note?.note,
      //   })),
      relatedAudio: result?.relatedAudio,
      //   .map((audio) => ({
      //     acknowledgement: audio.acknowledgement,
      //     description: audio.description,
      //     excludeFromGames: audio.excludeFromGames,
      //     excludeFromKids: audio.excludeFromKids,
      //     id: audio.id,
      //     isShared: audio.isShared,
      //     speakers: audio.speakers.map((speaker) => ({
      //       bio: speaker.bio,
      //       id: speaker.id,
      //       isShared: speaker.isShared,
      //       name: speaker.name,
      //       url: speaker.url,
      //     })),
      //   })),
      title: result?.title,
      titleTranslation: result?.titleTranslation,
      url: result?.url,
    })),
  }))

  console.log({ formattedResponse })

  return {
    ...allSongsResponse,
    data: formattedResponse,
  }
}
