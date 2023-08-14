import { useNavigate, useSearchParams } from 'react-router-dom'

// FPCC
import {
  useCategories,
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
  const { data, isInitialLoading } = useCategories()
  const { data: categoryData, isInitialLoading: categoryIsInitialLoading } =
    useCategory({ id: categoryId })

  const getParentCategoryOptions = () => {
    // If a category with no children allow assigning/changing a parent
    if (categoryData?.children?.length < 1) {
      const categories = data?.results
        ? data?.results?.map((result) => {
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
    if (categoryId && categoryData) {
      updateCategory(formData)
    } else {
      createCategory(formData)
    }
  }

  return {
    parentCategoryOptions: getParentCategoryOptions(),
    submitHandler,
    backHandler,
    dataToEdit: categoryData,
    deleteHandler: () => deleteCategory(categoryData?.id),
    isLoading: isInitialLoading || categoryIsInitialLoading,
  }
}

export default CategoryCrudData
