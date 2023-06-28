import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { CATEGORIES } from 'common/constants'
import api from 'services/api'

export default function useCategories() {
  const { sitename } = useParams()
  //   console.log({ sitename })
  const response = useQuery(
    [CATEGORIES, sitename],
    () => api.category.get({ sitename }),
    {
      // The query will not execute until the sitename exists
      enabled: !!sitename,
    },
  )
  //   console.log({ response })

  const formattedResults = response?.data?.results?.map((category) => ({
    id: category?.id,
    title: category?.title,
    description: category?.description,
    url: category?.url,
    children: category?.children?.map((child) => ({
      id: child?.id,
      title: child?.title,
      description: child?.description,
      url: child?.url,
    })),
  }))
  //   console.log({ formattedResults })
  return {
    ...response,
    response: { ...response.data, categories: formattedResults },
  }
}
