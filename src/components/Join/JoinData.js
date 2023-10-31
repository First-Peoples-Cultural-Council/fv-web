import { useEffect, useState } from 'react'

// FPCC
import { useJoinRequestCreate } from 'common/dataHooks/useJoinRequests'
import { useSiteStore } from 'context/SiteContext'

function JoinData() {
  const { site } = useSiteStore()
  const [stage, setStage] = useState('form')

  const { onSubmit, isError, isSuccess } = useJoinRequestCreate()

  useEffect(() => {
    if (isError) setStage('error')
    if (isSuccess) setStage('success')
  }, [isError, isSuccess])

  const submitHandler = (formData) => {
    onSubmit(formData)
  }

  return {
    submitHandler,
    site,
    stage,
  }
}

export default JoinData
