import { useQuery, useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router'

// FPCC
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import api from 'services/api'
import { AUDIO_PATH, TYPE_AUDIO, MEDIA } from 'common/constants'
import { audioForEditing, audioForApi } from 'common/dataAdaptors/mediaAdaptors'
import { isUUID } from 'common/utils/stringHelpers'

export function useAudio({ id, edit = false }) {
  const { sitename } = useParams()
  const response = useQuery({
    queryKey: [AUDIO_PATH, sitename, id],
    queryFn: () => api.audio.get({ sitename, id }),
    ...{ enabled: !!isUUID(id) },
  })
  const formattedData = edit
    ? audioForEditing({ data: response?.data })
    : response?.data

  return { ...response, data: formattedData }
}

export function useAudioCreate(options = {}) {
  const { sitename } = useParams()
  const createAudio = async (formData) => {
    // Audience flags
    const excludeFromGames = formData?.includeInGames === 'false'
    const excludeFromKids = formData?.includeInKids === 'false'
    const data = new FormData()
    data.append('title', formData?.title)
    data.append('description', formData?.description)
    data.append('acknowledgement', formData?.acknowledgement)
    data.append('excludeFromGames', excludeFromGames)
    data.append('excludeFromKids', excludeFromKids)
    data.append('isShared', formData?.isShared)
    data.append('original', formData?.audioFile?.[0])
    formData?.speakers.forEach((speaker) => {
      data.append('speakers', speaker)
    })
    return api.audio.create({
      sitename,
      data,
    })
  }
  const mutation = useMutation({
    mutationFn: createAudio,
    ...options,
  })

  return mutation
}

export function useAudioUpdate({ id }) {
  const { sitename } = useParams()
  const updateAudio = async (formData) => {
    const data = audioForApi({ formData })
    api.audio.partialUpdate({
      id,
      data,
      sitename,
    })
  }
  const mutation = useMutationWithNotification({
    mutationFn: updateAudio,
    redirectTo: `/${sitename}/dashboard/${MEDIA}/${AUDIO_PATH}`,
    actionWord: 'updated',
    type: TYPE_AUDIO,
    queryKeyToInvalidate: [AUDIO_PATH, sitename, id],
  })
  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }

  return { ...mutation, onSubmit }
}

export function useAudioDelete() {
  const { sitename } = useParams()
  const mutation = useMutationWithNotification({
    mutationFn: async (id) => api.audio.delete({ id, sitename }),
    actionWord: 'deleted',
    type: TYPE_AUDIO,
    refresh: true,
  })
  const onSubmit = (id) => {
    mutation.mutate(id)
  }

  return { ...mutation, onSubmit }
}
