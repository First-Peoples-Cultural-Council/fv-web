import { useSearchParams } from 'react-router-dom'

// FPCC
import useGoBack from 'common/hooks/useGoBack'
import { useSiteStore } from 'context/SiteContext'

function ErrorHandlerData() {
  const [searchParams] = useSearchParams()

  const { site } = useSiteStore()
  const { goBack } = useGoBack({
    fallbackRoute: site?.sitename ? `/${site?.sitename}` : '/',
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
