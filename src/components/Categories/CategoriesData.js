import { useParams } from 'react-router'

// FPCC
import { useCategoriesNested } from 'common/dataHooks/useCategories'

function CategoriesData() {
  const { sitename } = useParams()

  // Data fetch
  const categoryQueryResponse = useCategoriesNested()

  return {
    categoryQueryResponse,
    sitename,
  }
}

export default CategoriesData
