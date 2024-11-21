import { useParams, useSearchParams } from 'react-router-dom'

// FPCC
import useGoBack from 'common/hooks/useGoBack'

function ErrorHandlerData() {
  const [searchParams] = useSearchParams()

  const { sitename } = useParams()
  const { goBack } = useGoBack({
    fallbackRoute: sitename ? `/${sitename}` : '/',
  })

  const status = searchParams.get('status') || '0'
  const statusText = searchParams.get('statusText') || null

  return {
    errorStatusCode: parseInt(status, 10),
    errorStatusText: statusText,
    backHandler: goBack,
  }
}

export default ErrorHandlerData
