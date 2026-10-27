import { useEffect, useState } from 'react'

// FPCC
import {
  useJoinRequestCreate,
  useMyJoinRequests,
} from 'common/dataHooks/useJoinRequests'
import { useSiteStore } from 'context/SiteContext'
import { convertJsonToReadableString } from 'common/utils/stringHelpers'

function JoinData({ site }) {
  const { site: currentSite } = useSiteStore()
  const [stage, setStage] = useState('form')
  const [errorMessage, setErrorMessage] = useState()
  const [errorTitle, setErrorTitle] = useState()

  const { data: myJoinRequests, isSuccess: isMyJoinRequestsSuccess } =
    useMyJoinRequests({ sitename: site?.slug || currentSite?.slug })

  useEffect(() => {
    if (
      stage === 'form' &&
      isMyJoinRequestsSuccess &&
      myJoinRequests?.results?.length > 0
    ) {
      setErrorTitle('Existing Request Pending')
      setErrorMessage(
        'You have already submitted a request to join this Language Site.',
      )
      setStage('error')
    }
  }, [isMyJoinRequestsSuccess, myJoinRequests])

  const { mutate, isError, isSuccess, error } = useJoinRequestCreate({
    onError: async (_error) => {
      const response = await _error?.response?.json()
      const readableMessage = convertJsonToReadableString(response)

      let title = 'Request Failed'
      let message = readableMessage || ''
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
