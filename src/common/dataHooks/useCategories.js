import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { CATEGORIES } from 'common/constants'
import api from 'services/api'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'

export function useCategory({ id }) {
  const { sitename } = useParams()
  const response = useQuery(
    [CATEGORIES, sitename, id],
    () => api.categories.get({ sitename, id }),
    { enabled: !!id },
  )
  return {
    ...response,
    data: { ...response?.data, parentId: response?.data?.parent?.id },
  }
}

export function useCategories() {
  const { sitename } = useParams()
  const response = useQuery(
    [CATEGORIES, sitename],
    () => api.categories.getAll({ sitename }),
    {
      // The query will not execute until the sitename exists
      enabled: !!sitename,
    },
  )
  const allCategories = []
  response?.data?.results?.forEach((category) => {
    allCategories.push({
      ...category,
    })
    if (category?.children?.length > 0) {
      category?.children?.forEach((child) => {
        allCategories.push({
          ...child,
          parentId: category.id,
          parentTitle: category.title,
        })
      })
    }
  })

  return { ...response, allCategories }
}

export function useCategoryCreate() {
  const { sitename } = useParams()

  const createCategory = async (formData) => {
    const properties = {
      title: formData?.title || null,
      description: formData?.description || null,
      parentId: formData?.parentId || null,
    }
    return api.categories.create({
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: createCategory,
    redirectTo: `/${sitename}/dashboard/edit/categories`,
    queryKey: [CATEGORIES, sitename],
    actionWord: 'created',
    type: 'category',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}

export function useCategoryUpdate() {
  const { sitename } = useParams()

  const updateCategory = async (formData) => {
    const properties = {
      title: formData?.title || null,
      description: formData?.description || null,
      parentId: formData?.parentId || null,
    }
    return api.categories.update({
      id: formData?.id,
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updateCategory,
    redirectTo: `/${sitename}/dashboard/edit/categories`,
    queryKeyToInvalidate: [CATEGORIES, sitename],
    actionWord: 'updated',
    type: 'category',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}

export function useCategoryDelete() {
  const { sitename } = useParams()
  const deleteCategory = async (id) =>
    api.categories.delete({
      id,
      sitename,
    })

  const mutation = useMutationWithNotification({
    mutationFn: deleteCategory,
    redirectTo: `/${sitename}/dashboard/edit/categories`,
    queryKeyToInvalidate: [CATEGORIES, sitename],
    actionWord: 'deleted',
    type: 'category',
  })
  const onSubmit = (id) => {
    mutation.mutate(id)
  }
  return { onSubmit }
}
