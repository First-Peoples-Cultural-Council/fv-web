import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

// FPCC
import { GALLERIES } from 'common/constants'
import api from 'services/api'
import {
  galleryForViewing,
  galleryForEditing,
  galleryForApi,
} from 'common/dataAdaptors'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import { isUUID } from 'common/utils/stringHelpers'

export function useGallery({ id, edit = false }) {
  const { sitename } = useParams()
  const queryResponse = useQuery({
    queryKey: [GALLERIES, sitename, id],
    queryFn: () => api.galleries.get({ sitename, id }),
    select: (data) =>
      edit
        ? galleryForEditing({ item: data })
        : galleryForViewing({ item: data }),
    enabled: !!isUUID(id),
  })

  return queryResponse
}

export function useGalleries() {
  const { sitename } = useParams()

  const queryResponse = useQuery({
    queryKey: [GALLERIES, sitename],
    queryFn: () => api.galleries.getAll({ sitename }),
    enabled: !!sitename,
  })

  return queryResponse
}

export function useGalleryCreate() {
  const { sitename } = useParams()

  const createGallery = async (formData) => {
    const properties = galleryForApi({ formData })
    return api.galleries.create({
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: createGallery,
    redirectTo: `/${sitename}/dashboard/edit/galleries`,
    queryKeyToInvalidate: [GALLERIES, sitename],
    actionWord: 'created',
    type: 'gallery',
  })

  const onSubmit = (formData) => mutation.mutate(formData)

  return { onSubmit }
}

export function useGalleryUpdate() {
  const { sitename } = useParams()

  const updateGallery = async (formData) => {
    const properties = galleryForApi({ formData })
    return api.galleries.update({
      sitename,
      id: formData?.id,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updateGallery,
    redirectTo: `/${sitename}/dashboard/edit/galleries`,
    queryKeyToInvalidate: [GALLERIES, sitename],
    actionWord: 'updated',
    type: 'gallery',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}

export function useGalleryDelete() {
  const { sitename } = useParams()
  const deleteGallery = async (id) =>
    api.galleries.delete({
      id,
      sitename,
    })

  const mutation = useMutationWithNotification({
    mutationFn: deleteGallery,
    redirectTo: `/${sitename}/dashboard/edit/galleries`,
    queryKeyToInvalidate: [GALLERIES, sitename],
    actionWord: 'deleted',
    type: 'gallery',
  })
  const onSubmit = (galleryId) => {
    mutation.mutate(galleryId)
  }
  return { onSubmit }
}
