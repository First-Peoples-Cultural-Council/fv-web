import { useLocation, useNavigate } from 'react-router-dom'

// FPCC

const useGoBack = ({ fallbackRoute }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const goBack = () => {
    const thereIsAPrevPage = location.key !== 'default'
    if (thereIsAPrevPage) {
      return navigate(-1)
    }
    return navigate(fallbackRoute || '/')
  }

  return {
    goBack,
  }
}

export default useGoBack
