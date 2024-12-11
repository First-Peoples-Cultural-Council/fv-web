import { useSearchParams, useNavigate } from 'react-router-dom'

// FPCC

function ErrorHandlerData() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const backHandler = () => navigate(-1)

  const status = searchParams.get('status') || '0'
  const statusText = searchParams.get('statusText') || null

  return {
    errorStatusCode: parseInt(status, 10),
    errorStatusText: statusText,
    backHandler,
  }
}

export default ErrorHandlerData
