import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function ErrorHandlerData() {
  const location = useLocation()
  const navigate = useNavigate()
  const [goBack, setGoBack] = useState(false)

  const backHandler = () => {
    setGoBack(true)
  }

  const status = new URLSearchParams(location.search).get('status')
    ? new URLSearchParams(location.search).get('status')
    : '0'
  const statusText = new URLSearchParams(location.search).get('statusText')
    ? new URLSearchParams(location.search).get('statusText')
    : null

  useEffect(() => {
    if (navigate && goBack) {
      navigate(-1)
    }
  }, [goBack])

  return {
    errorStatusCode: parseInt(status),
    errorStatusText: statusText,
    backHandler,
  }
}

export default ErrorHandlerData
