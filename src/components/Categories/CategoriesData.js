import { useParams } from 'react-router-dom'

// FPCC
import { useCategories } from 'common/dataHooks/useCategories'

function CategoriesData() {
  const { sitename } = useParams()

  // Data fetch
  const categoryQueryReturn = useCategories()

  return {
    categoryQueryReturn,
    sitename,
  }
}

export default CategoriesData
