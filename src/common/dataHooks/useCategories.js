import { useQuery } from 'react-query'

// FPCC
import { CATEGORIES } from 'common/constants'
import api from 'services/api'

export default function useCategories() {
  const response = useQuery([CATEGORIES], () => api.category.get())
  console.log({ response })
}
