import { useSearchParams } from 'react-router-dom'

// FPCC
import { useLanguages } from 'common/dataHooks/useLanguages'
import { useUserStore } from 'context/UserContext'

function LanguagesData() {
  const { user } = useUserStore()

  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const languagesQueryResponse = useLanguages({
    query,
  })

  return {
    languagesQueryResponse,
    user,
  }
}

export default LanguagesData
