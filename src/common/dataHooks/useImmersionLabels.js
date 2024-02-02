import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { IMMERSION_LABELS } from 'common/constants'
import api from 'services/api'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import { immersionLabelsAdaptor } from 'common/dataAdaptors/immersionAdaptors'

export function useImmersionLabels() {
  const { sitename } = useParams()

  const response = useQuery(
    [IMMERSION_LABELS, sitename],
    () => api.immersionLabels.getAll({ sitename }),
    { enabled: !!sitename },
  )

  const formattedLabels = immersionLabelsAdaptor(response?.data)

  return { ...response, labels: formattedLabels }
}

export function useImmersionMap() {
  const { sitename } = useParams()

  const response = useQuery(
    [IMMERSION_LABELS, sitename, 'mapped'],
    () => api.immersionLabels.getMapped({ sitename }),
    { enabled: !!sitename },
  )

  return response
}

export function useImmersionLabel({ key }) {
  const { sitename } = useParams()

  const response = useQuery(
    [IMMERSION_LABELS, sitename, key],
    () => api.immersionLabels.get({ sitename, key }),
    { enabled: !!key },
  )

  return response
}

export function useImmersionLabelCreate() {
  const { sitename } = useParams()

  const createImmersionLabel = async (formData) => {
    const properties = {
      dictionary_entry: formData?.dictionaryEntry?.[0]?.id,
      key: formData?.transKey,
    }
    return api.immersionLabels.create({
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: createImmersionLabel,
    queryKeyToInvalidate: [IMMERSION_LABELS, sitename],
    actionWord: 'assigned',
    type: 'immersion label',
  })

  const onSubmit = (formData) => mutation.mutate(formData)

  return { ...mutation, onSubmit }
}

export function useImmersionLabelUpdateEntry() {
  const { sitename } = useParams()

  const updateImmersionLabel = async (formData) => {
    const properties = {
      dictionary_entry: formData?.dictionaryEntry?.[0]?.id,
    }
    return api.immersionLabels.partialUpdate({
      key: formData?.transKey,
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updateImmersionLabel,
    queryKeyToInvalidate: [IMMERSION_LABELS, sitename],
    actionWord: 'updated',
    type: 'immersion label',
  })

  const onSubmit = (formData) => mutation.mutate(formData)
  return { ...mutation, onSubmit }
}

export function useImmersionLabelDelete() {
  const { sitename } = useParams()
  const deleteImmersionLabel = async (key) =>
    api.immersionLabels.delete({
      key,
      sitename,
    })

  const mutation = useMutationWithNotification({
    mutationFn: deleteImmersionLabel,
    queryKeyToInvalidate: [IMMERSION_LABELS, sitename],
    actionWord: 'unassigned',
    type: 'immersion label',
  })
  const onSubmit = (key) => {
    mutation.mutate(key)
  }
  return { ...mutation, onSubmit }
}
