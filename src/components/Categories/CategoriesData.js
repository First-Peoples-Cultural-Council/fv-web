import { useParams } from 'react-router'

// FPCC
import { useCategories } from 'common/dataHooks/useCategories'

function CategoriesData() {
  const { sitename } = useParams()

  // Data fetch
  const categoryQueryResponse = useCategories()

  return {
    categoryQueryResponse,
    sitename,
  }
}

export default CategoriesData
