import { useMutation, useQueryClient } from '@tanstack/react-query'

// FPCC
import { ERROR, SUCCESS } from 'common/constants'
import { useNotification } from 'context/NotificationContext'

export default function useMutationWithNotification({
  mutationFn,
  redirectTo,
  queryKeyToInvalidate,
  type,
  actionWord = 'saved',
}) {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      setNotification({
        type: SUCCESS,
        message: `Success! The ${type} has been ${actionWord}.`,
      })
      if (redirectTo) {
        setTimeout(() => {
          window.location.href = redirectTo
        }, 1000)
      }
    },
    onError: () => {
      setNotification({
        type: ERROR,
        message: `ERROR: Your ${type} was NOT ${actionWord}. Please try again. If the error persists please contact FirstVoices Support.`,
      })
    },
    onSettled: () => {
      if (queryKeyToInvalidate) {
        queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate })
      }
    },
  })

  return mutation
}
