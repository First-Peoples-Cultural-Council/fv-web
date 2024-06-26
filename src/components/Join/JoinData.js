import { useEffect, useState } from 'react'

// FPCC
import { useJoinRequestCreate } from 'common/dataHooks/useJoinRequests'
import { useSiteStore } from 'context/SiteContext'
import { convertJsonToReadableString } from 'common/utils/stringHelpers'

function JoinData({ site }) {
  const { site: currentSite } = useSiteStore()
  const [stage, setStage] = useState('form')
  const [errorMessage, setErrorMessage] = useState()
  const [errorTitle, setErrorTitle] = useState()

  const { mutate, isError, isSuccess, error } = useJoinRequestCreate({
    onError: async (_error) => {
      const response = await _error?.response?.json()
      const readableMessage = convertJsonToReadableString(response)

      let title = 'Request Failed'
      let message = readableMessage || ''
      if (message?.includes('exists')) {
        title = 'Existing Request Pending'
        message =
          'You have already submitted a request to join this Language Site.'
      }
      setErrorTitle(title)
      setErrorMessage(message)
    },
  })

  useEffect(() => {
    if (isError) {
      setStage('error')
    }
    if (isSuccess) {
      setStage('success')
    }
  }, [isError, isSuccess, error])

  const submitHandler = (formData) => {
    mutate(formData)
  }

  return {
    submitHandler,
    siteToJoin: site || currentSite,
    stage,
    errorMessage,
    errorTitle,
  }
}

export default JoinData
