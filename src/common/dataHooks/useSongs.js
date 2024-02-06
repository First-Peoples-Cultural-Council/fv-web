import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import api from 'services/api'
import { SONGS, TYPE_SONG } from 'common/constants'
import {
  songForViewing,
  songForEditing,
  songForApi,
} from 'common/dataAdaptors/songAdaptors'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import { useUserStore } from 'context/UserContext'
import { ASSISTANT } from 'common/constants/roles'

export function useSongs() {
  const { sitename } = useParams()

  const allSongsResponse = useInfiniteQuery(
    [SONGS, sitename],
    ({ pageParam = 1 }) =>
      api.songs.getAll({
        sitename,
        pageParam,
      }),
    {
      // The query will not execute until the sitename exists
      enabled: !!sitename,
    },
  )
  const formattedResponse = allSongsResponse?.data?.pages?.map((page) => ({
    results: page?.results?.map((result) => songForViewing({ item: result })),
  }))

  return {
    ...allSongsResponse,
    data: formattedResponse,
  }
}

export function useSong({ id, sitename, edit = false }) {
  const { sitename: paramsSitename } = useParams()
  const sitenameToSend = sitename || paramsSitename

  const response = useQuery(
    [SONGS, sitenameToSend, id],
    () => api.songs.get({ sitename: sitenameToSend, id }),
    {
      // The query will not execute until the sitename exists
      enabled: !!id,
    },
  )

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

  const { user } = useUserStore()
  const userRoles = user?.roles || {}
  const userSiteRole = userRoles?.[sitename] || ''
  const isAssistant = userSiteRole === ASSISTANT

  const mutation = useMutationWithNotification({
    mutationFn: createSong,
    redirectTo: isAssistant // Redirect to the create page for assistants to be removed when assistants can access the edit pages (FW-4828)
      ? `/${sitename}/dashboard/create`
      : `/${sitename}/dashboard/edit/entries?types=${TYPE_SONG}`,
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

  const mutation = useMutationWithNotification({
    mutationFn: updateSong,
    redirectTo: `/${sitename}/dashboard/edit/entries?types=${TYPE_SONG}`,
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
    redirectTo: `/${sitename}/dashboard/edit/entries?types=${TYPE_SONG}`,
    queryKeyToInvalidate: [SONGS, sitename],
    actionWord: 'deleted',
    type: 'song',
  })
  const onSubmit = (id) => {
    mutation.mutate(id)
  }
  return { onSubmit }
}
