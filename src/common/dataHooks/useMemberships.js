import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

// FPCC
import { MEMBER, MEMBERSHIPS } from 'common/constants'
import api from 'services/api'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'

export function useMemberships({ page }) {
  const { sitename } = useParams()
  const queryResponse = useQuery({
    queryKey: [MEMBERSHIPS, sitename, page],
    queryFn: ({ page = 1 }) =>
      api.memberships.getAll({
        sitename,
        pageParam: page,
      }),
    keepPreviousData: true,
  })
  return queryResponse
}

export function useMembershipUpdateRole() {
  const { sitename } = useParams()

  const updateMembershipRole = async (formData) => {
    const properties = {
      role: formData?.role || MEMBER,
    }
    return api.memberships.partialUpdate({
      id: formData?.id,
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updateMembershipRole,
    redirectTo: `/${sitename}/dashboard/edit/memberships`,
    queryKeyToInvalidate: [MEMBERSHIPS, sitename],
    actionWord: 'updated',
    type: 'membership role',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}

export function useMembershipDelete() {
  const { sitename } = useParams()
  const deleteMembership = async (id) =>
    api.memberships.delete({
      id,
      sitename,
    })

  const mutation = useMutationWithNotification({
    mutationFn: deleteMembership,
    redirectTo: `/${sitename}/dashboard/edit/memberships`,
    queryKeyToInvalidate: [MEMBERSHIPS, sitename],
    actionWord: 'deleted',
    type: 'membership',
  })
  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}
