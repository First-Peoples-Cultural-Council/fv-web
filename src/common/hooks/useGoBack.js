import { useNavigate } from 'react-router-dom'

// FPCC

const useGoBack = ({ fallbackRoute }) => {
  const navigate = useNavigate()

  const goBack = () => {
    const thereIsAPrevPage = navigate?.length > 1
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
