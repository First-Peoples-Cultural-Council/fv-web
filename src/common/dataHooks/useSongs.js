import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

// FPCC
import api from 'services/api'
import {
  SONGS,
  TYPES,
  TYPE_SONG,
  VISIBILITY,
  VISIBILITY_TEAM,
} from 'common/constants'
import {
  songForViewing,
  songForEditing,
  songForApi,
} from 'common/dataAdaptors/songAdaptors'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import useAuthCheck from 'common/hooks/useAuthCheck'
import useInfiniteScroll from 'common/dataHooks/useInfiniteScroll'

export function useSongs() {
  const { sitename } = useParams()

  const infiniteQueryResponse = useInfiniteScroll({
    queryKey: [SONGS, sitename],
    queryFn: ({ pageParam = 1 }) =>
      api.songs.getAll({
        sitename,
        pageParam,
      }),
    resultAdaptor: (result) => songForViewing({ item: result }),
  })

  return infiniteQueryResponse
}

export function useSong({ id, sitename, edit = false }) {
  const { sitename: paramsSitename } = useParams()
  const sitenameToSend = sitename || paramsSitename

  const response = useQuery({
    queryKey: [SONGS, sitenameToSend, id],
    queryFn: () => api.songs.get({ sitename: sitenameToSend, id }),
    ...{ enabled: !!id },
  })

  const formattedSong = edit
    ? songForEditing({ item: response?.data })
    : songForViewing({ item: response?.data })

  return {
    ...response,
    data: formattedSong,
  }
}

export function useSongCreate() {
  const { sitename } = useParams()

  const createSong = async (formData) => {
    const properties = songForApi({ formData })
    return api.songs.create({
      sitename,
      properties,
    })
  }

  const { checkIfAssistant } = useAuthCheck()

  const mutation = useMutationWithNotification({
    mutationFn: createSong,
    redirectTo: `/${sitename}/dashboard/edit/entries?${TYPES}=${TYPE_SONG}${
      checkIfAssistant() ? `&${VISIBILITY}=${VISIBILITY_TEAM}` : ''
    }`,
    queryKeyToInvalidate: [SONGS, sitename],
    actionWord: 'created',
    type: 'song',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}

export function useSongUpdate() {
  const { sitename } = useParams()

  const updateSong = async (formData) => {
    const properties = songForApi({ formData })
    return api.songs.update({
      id: formData?.id,
      sitename,
      properties,
    })
  }

  const { checkIfAssistant } = useAuthCheck()

  const mutation = useMutationWithNotification({
    mutationFn: updateSong,
    redirectTo: `/${sitename}/dashboard/edit/entries?${TYPES}=${TYPE_SONG}${
      checkIfAssistant() ? `&${VISIBILITY}=${VISIBILITY_TEAM}` : ''
    }`,
    queryKeyToInvalidate: [SONGS, sitename],
    actionWord: 'updated',
    type: 'song',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}

export function useSongDelete() {
  const { sitename } = useParams()
  const deleteSong = async (id) =>
    api.songs.delete({
      id,
      sitename,
    })

  const mutation = useMutationWithNotification({
    mutationFn: deleteSong,
    redirectTo: `/${sitename}/dashboard/edit/entries?${TYPES}=${TYPE_SONG}`,
    queryKeyToInvalidate: [SONGS, sitename],
    actionWord: 'deleted',
    type: 'song',
  })
  const onSubmit = (id) => {
    mutation.mutate(id)
  }
  return { onSubmit }
}
