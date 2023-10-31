import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import api from 'services/api'
import { JOIN_REQUESTS, MEMBER } from 'common/constants'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'

export function useJoinRequests() {
  const { sitename } = useParams()

  const allJoinRequestsResponse = useInfiniteQuery(
    [JOIN_REQUESTS, sitename],
    ({ pageParam = 1 }) =>
      api.joinRequests.getJoinRequests({
        sitename,
        pageParam,
      }),
    {
      // The query will not execute until the sitename exists
      enabled: !!sitename,
    },
  )

  return allJoinRequestsResponse
}

export function useJoinRequestCreate() {
  const { sitename } = useParams()

  const createJoinRequest = async (formData) => {
    const properties = {
      reasons: formData?.reasons,
      reason_note: formData?.message,
    }
    return api.joinRequests.create({
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: createJoinRequest,
    queryKeyToInvalidate: [JOIN_REQUESTS, sitename],
    actionWord: 'created',
    type: 'join request',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { ...mutation, onSubmit }
}

// APPROVE
export function useJoinRequestApprove() {
  const { sitename } = useParams()

  const approveJoinRequest = async (formData) => {
    const properties = {
      role: formData?.role || MEMBER,
    }
    return api.joinRequests.approve({
      id: formData?.id,
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: approveJoinRequest,
    queryKeyToInvalidate: [JOIN_REQUESTS, sitename],
    actionWord: 'approved',
    type: 'join request',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { ...mutation, onSubmit }
}

// IGNORE
export function useJoinRequestIgnore() {
  const { sitename } = useParams()
  const ignoreJoinRequest = async (id) =>
    api.joinRequests.ignore({
      id,
      sitename,
    })

  const mutation = useMutationWithNotification({
    mutationFn: ignoreJoinRequest,
    queryKeyToInvalidate: [JOIN_REQUESTS, sitename],
    actionWord: 'ignored',
    type: 'join request',
  })
  const onSubmit = (id) => {
    mutation.mutate(id)
  }
  return { ...mutation, onSubmit }
}

// REJECT
export function useJoinRequestReject() {
  const { sitename } = useParams()
  const rejectJoinRequest = async (id) =>
    api.joinRequests.reject({
      id,
      sitename,
    })

  const mutation = useMutationWithNotification({
    mutationFn: rejectJoinRequest,
    queryKeyToInvalidate: [JOIN_REQUESTS, sitename],
    actionWord: 'rejected',
    type: 'join request',
  })
  const onSubmit = (id) => {
    mutation.mutate(id)
  }
  return { ...mutation, onSubmit }
}

// DELETE
export function useJoinRequestDelete() {
  const { sitename } = useParams()
  const deleteJoinRequest = async (id) =>
    api.joinRequests.delete({
      id,
      sitename,
    })

  const mutation = useMutationWithNotification({
    mutationFn: deleteJoinRequest,
    queryKeyToInvalidate: [JOIN_REQUESTS, sitename],
    actionWord: 'deleted',
    type: 'join request',
  })
  const onSubmit = (id) => {
    mutation.mutate(id)
  }
  return { ...mutation, onSubmit }
}
