import { useInfiniteQuery } from '@tanstack/react-query'
// import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import api from 'services/api'
import { SONGS } from 'common/constants'

export default function useSongs() {
  const { sitename } = useParams()
  console.log({ sitename })
  const allSongsResponse = useInfiniteQuery(
    [SONGS, sitename],
    () => api.song.get({ sitename }),
    {
      // The query will not execute until the sitename exists
      enabled: !!sitename,
    },
  )
  console.log({ allSongsResponse })
  const formattedResponse = allSongsResponse?.data?.pages?.results?.map(
    (song) => ({
      ackowledgement: song.ackowledgement,
      coverImage: song.coverImage.map((image) => ({
        acknowledgement: image.acknowledgement,
        description: image.description,
        excludeFromGames: image.excludeFromGames,
        excludeFromKids: image.excludeFromKids,
        id: image.id,
        isShared: image.isShared,
        title: image.title,
        url: image.url,
      })),
      created: song.created,
      excludeFromGames: song.excludeFromGames,
      excludeFromKids: song.excludeFromKids,
      hideOverlay: song.hideOverlay,
      id: song.id,
      introduction: song.introduction,
      introductionTranslation: song.introductionTranslation,
      lastModified: song.lastModified,
      lyrics: song.lyrics.map((lyric) => ({
        id: lyric.id,
        text: lyric.text,
        translation: lyric.translation,
      })),
      notes: song.notes.map((note) => ({
        note: note.note,
      })),
      relatedAudio: song.relatedAudio.map((audio) => ({
        acknowledgement: audio.acknowledgement,
        description: audio.description,
        excludeFromGames: audio.excludeFromGames,
        excludeFromKids: audio.excludeFromKids,
        id: audio.id,
        isShared: audio.isShared,
        speakers: audio.speakers.map((speaker) => ({
          bio: speaker.bio,
          id: speaker.id,
          isShared: speaker.isShared,
          name: speaker.name,
          url: speaker.url,
        })),
      })),
      title: song?.title,
      titleTranslation: song.titleTranslation,
      url: song.url,
    }),
  )

  return {
    ...allSongsResponse,
    data: formattedResponse,
  }
}
