import { useSearchParams, useNavigate } from 'react-router'

// FPCC

function ErrorHandlerData() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const backHandler = () => {
    // If the user's history is the same site, go back in history
    // If the user's history is not the same site, navigate to the home page
    const isInternalHistory =
      window.history.state && window.history.state.idx > 0
    if (isInternalHistory) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  const status = searchParams.get('status') || '0'
  const statusText = searchParams.get('statusText') || null

  return {
    errorStatusCode: parseInt(status, 10),
    errorStatusText: statusText,
    backHandler,
  }
}

export default ErrorHandlerData
