import { useNavigate, useSearchParams } from 'react-router'

// FPCC
import {
  useCategoriesNested,
  useCategory,
  useCategoryCreate,
  useCategoryUpdate,
  useCategoryDelete,
} from 'common/dataHooks/useCategories'

function CategoryCrudData() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const backHandler = () => navigate(-1)

  const categoryId = searchParams.get('id')

  // Fetch Data
  const categoriesQueryResponse = useCategoriesNested()
  const categoryQueryResponse = useCategory({ id: categoryId })

  const getParentCategoryOptions = () => {
    // If a category with no children or a new category allow assigning/changing a parent
    if (categoryQueryResponse?.data?.children?.length < 1 || !categoryId) {
      const categories = categoriesQueryResponse?.data?.results
        ? categoriesQueryResponse?.data?.results?.map((result) => {
            const category = { label: result?.title, value: result?.id }
            return category
          })
        : []
      return [...categories, { label: '---------', value: '' }]
    }
    return []
  }

  const { onSubmit: createCategory } = useCategoryCreate()
  const { onSubmit: updateCategory } = useCategoryUpdate()
  const { onSubmit: deleteCategory } = useCategoryDelete()

  const submitHandler = (formData) => {
    if (categoryId && categoryQueryResponse?.data) {
      updateCategory(formData)
    } else {
      createCategory(formData)
    }
  }

  return {
    parentCategoryOptions: getParentCategoryOptions(),
    submitHandler,
    backHandler,
    dataToEdit: categoryQueryResponse?.data,
    deleteHandler: () => deleteCategory(categoryQueryResponse?.data?.id),
    categoriesQueryResponse,
  }
}

export default CategoryCrudData
