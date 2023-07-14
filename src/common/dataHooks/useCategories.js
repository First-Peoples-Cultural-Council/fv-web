import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { CATEGORIES } from 'common/constants'
import api from 'services/api'

export default function useCategories() {
  const { sitename } = useParams()
  const response = useQuery(
    [CATEGORIES, sitename],
    () => api.category.get({ sitename }),
    {
      // The query will not execute until the sitename exists
      enabled: !!sitename,
    },
  )
  const allCategories = []
  response?.data?.results?.forEach((category) => {
    allCategories.push({ ...category, parentId: null })
    if (category?.children?.length > 0) {
      category?.children?.forEach((child) => {
        allCategories.push({ ...child, parentId: category.id })
      })
    }
  })

  return { ...response, allCategories }
}
