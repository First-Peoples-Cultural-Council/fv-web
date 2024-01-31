import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

// FPCC
import { ERROR, SUCCESS } from 'common/constants'
import { useNotification } from 'context/NotificationContext'
import { convertJsonToReadableString } from 'common/utils/stringHelpers'

export default function useMutationWithNotification({
  mutationFn,
  onSuccessCallback,
  queryKeyToInvalidate,
  redirectTo,
  type,
  actionWord = 'saved',
  responseRedirectFn,
}) {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn,
    onSuccess: (response) => {
      setNotification({
        type: SUCCESS,
        message: `Success! The ${type} has been ${actionWord}.`,
      })
      if (onSuccessCallback) {
        onSuccessCallback(response)
      }
      if (redirectTo) {
        setTimeout(() => {
          navigate(redirectTo)
        }, 1000)
      } else if (responseRedirectFn)
        setTimeout(() => {
          navigate(responseRedirectFn(response))
        }, 1000)
    },
    onError: async (error) => {
      const response = await error?.response?.json()
      const readableMessage = convertJsonToReadableString(response)

      setNotification({
        type: ERROR,
        message: `ERROR: Your ${type} was NOT ${actionWord}. ${
          readableMessage || ''
        }Please try again. If the error persists please contact FirstVoices Support.`,
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
