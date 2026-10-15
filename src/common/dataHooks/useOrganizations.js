import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

// FPCC
import api from 'services/api'
import { ORGANIZATIONS } from 'common/constants'
import {
  organizationForViewing,
  organizationForEditing,
  organizationForApi,
} from 'common/dataAdaptors/organizationAdaptors'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import useInfiniteScroll from 'common/dataHooks/useInfiniteScroll'

export function useOrganizations() {
  const { sitename } = useParams()

  const infiniteQueryResponse = useInfiniteScroll({
    queryKey: [ORGANIZATIONS, sitename],
    queryFn: ({ pageParam = 1 }) =>
      api.organizations.getAll({
        sitename,
        pageParam,
      }),
    resultAdaptor: (result) => organizationForViewing({ item: result }),
  })

  return infiniteQueryResponse
}

export function useOrganization({ id, edit = false }) {
  const { sitename } = useParams()

  const queryResponse = useQuery({
    queryKey: [ORGANIZATIONS, sitename, id],
    queryFn: () => api.organizations.get({ sitename, id }),
    select: (data) =>
      edit
        ? organizationForEditing({ item: data })
        : organizationForViewing({ item: data }),
    enabled: !!id,
  })

  return queryResponse
}

export function useOrganizationCreate() {
  const { sitename } = useParams()

  const createOrganization = async (formData) => {
    const properties = organizationForApi({ formData })
    return api.organizations.create({
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: createOrganization,
    redirectTo: `/${sitename}/dashboard/edit/organizations`,
    queryKeyToInvalidate: [ORGANIZATIONS, sitename],
    actionWord: 'created',
    type: 'organization',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}

export function useOrganizationUpdate() {
  const { sitename } = useParams()

  const updateOrganization = async (formData) => {
    const properties = organizationForApi({ formData })
    return api.organizations.update({
      id: formData?.id,
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updateOrganization,
    redirectTo: `/${sitename}/dashboard/edit/organizations`,
    queryKeyToInvalidate: [ORGANIZATIONS, sitename],
    actionWord: 'updated',
    type: 'organization',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}

export function useOrganizationDelete() {
  const { sitename } = useParams()
  const deleteOrganization = async (id) =>
    api.organizations.delete({
      id,
      sitename,
    })

  const mutation = useMutationWithNotification({
    mutationFn: deleteOrganization,
    redirectTo: `/${sitename}/dashboard/edit/organizations`,
    queryKeyToInvalidate: [ORGANIZATIONS, sitename],
    actionWord: 'deleted',
    type: 'organization',
  })
  const onSubmit = (id) => {
    mutation.mutate(id)
  }
  return { onSubmit }
}
