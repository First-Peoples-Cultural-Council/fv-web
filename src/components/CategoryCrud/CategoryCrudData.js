import { useQuery, useQueryClient } from 'react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'

// FPCC
import { DOC_CATEGORY } from 'common/constants'
import api from 'services/api'
import { useSiteStore } from 'context/SiteContext'
import categoryCrudDataAdaptor from 'components/CategoryCrud/categoryCrudDataAdaptor'
import { useNotification } from 'context/NotificationContext'

function CategoryCrudData() {
  const { site } = useSiteStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { setNotification } = useNotification()
  const [searchParams] = useSearchParams()

  const backHandler = () => navigate(-1)

  const categoryId = searchParams.get('id')

  // Fetch Parent Categories
  const { data, isLoading } = useQuery(
    ['parent-categories', site?.uid],
    () =>
      api.category.get({
        siteId: site?.uid,
        parentsOnly: 'true',
        inUseOnly: 'false',
      }),
    {
      enabled: !!site?.uid, // The query will not execute until the siteId exists
    },
  )

  const parentCategories = site?.children?.Categories
    ? [{ label: '-----', value: site?.children?.Categories }]
    : []

  if (data?.categories?.length > 0) {
    data?.categories.forEach((category) =>
      parentCategories?.push({ label: category?.title, value: category?.id }),
    )
  }

  let dataToEdit = null

  const { data: categoryData } = useQuery(
    ['category', categoryId],
    () => api.document.get({ id: categoryId, properties: '*' }),
    {
      // The query will not execute until the uid exists
      enabled: !!categoryId?.uid,
    },
  )
  dataToEdit = categoryCrudDataAdaptor({ data: categoryData })

  const submitHandler = (formData) => {
    if (categoryId && dataToEdit) {
      updateCategory(formData)
    } else {
      createCategory(formData)
    }
  }

  const createCategory = async (formData) => {
    const response = await api.document.create({
      parentId: formData?.parentId,
      name: formData?.title,
      docType: DOC_CATEGORY,
      properties: {
        'dc:title': formData?.title,
        'dc:description': formData?.description,
      },
    })
    if (response?.uid) {
      setNotification({
        type: 'SUCCESS',
        message: 'Success! Your category has been created.',
      })
      setTimeout(() => {
        backHandler()
      }, 1000)
    } else {
      setNotification({
        type: 'ERROR',
        message:
          'ERROR: There was a problem creating your category. Please try again. If the error persists please contact FirstVoices Support.',
      })
    }
  }

  const updateCategory = async (formData) => {
    const response = await api.document.update({
      id: categoryId,
      parentRef: formData?.parentId,
      properties: {
        'dc:title': formData?.title,
        'dc:description': formData?.description,
      },
    })
    if (response?.uid) {
      if (formData?.parentId !== dataToEdit?.parentId) {
        api.category.updateParent({
          categoryId,
          parentCategoryId: formData?.parentId,
        })
      }
      setNotification({
        type: 'SUCCESS',
        message: 'Success! Your category has been saved.',
      })
      queryClient.invalidateQueries(['categories', site?.id])
      queryClient.invalidateQueries(['category', categoryId])
      backHandler()
    } else {
      setNotification({
        type: 'ERROR',
        message:
          'ERROR: The changes to your category have not been saved. Please try again. If the error persists please contact FirstVoices Support.',
      })
    }
  }

  return {
    categoriesDirectoryId: site?.children?.Categories || '',
    phrasebooksDirectoryId: site?.children?.['Phrase Books'] || '',
    parentCategories,
    submitHandler,
    backHandler,
    dataToEdit,
    isLoading,
  }
}

export default CategoryCrudData
