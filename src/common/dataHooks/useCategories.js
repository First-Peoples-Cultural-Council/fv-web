import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

// FPCC
import { CATEGORIES } from 'common/constants'
import api from 'services/api'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import { categoryForApi } from 'common/dataAdaptors/categoriesAdaptors'

export function useCategory({ id }) {
  const { sitename } = useParams()
  const queryResponse = useQuery({
    queryKey: [CATEGORIES, sitename, id],
    queryFn: () => api.categories.get({ sitename, id }),
    select: (data) => ({ ...data, parentId: data?.parent?.id }),
    enabled: !!id,
  })
  return queryResponse
}

export function useCategoriesNested() {
  const { sitename } = useParams()
  const queryResponse = useQuery({
    queryKey: [CATEGORIES, sitename, 'nested'],
    queryFn: () => api.categories.getAll({ sitename, nested: 'true' }),
    enabled: !!sitename,
  })

  return queryResponse
}

export function useCategoriesFlat() {
  const { sitename } = useParams()

  const categoriesAdaptor = (category, data) => {
    const parentCategory = data?.results?.find(
      (parentCategory) => parentCategory?.id === category?.parent,
    )
    return {
      ...category,
      parentTitle: parentCategory ? parentCategory?.title : null,
    }
  }

  const queryResponse = useQuery({
    queryKey: [CATEGORIES, sitename, 'flat'],
    queryFn: () => api.categories.getAll({ sitename, nested: 'false' }),
    select: (data) => ({
      ...data,
      results: data?.results?.map((category) =>
        categoriesAdaptor(category, data),
      ),
    }),
    enabled: !!sitename,
  })

  return queryResponse
}

export function useCategoryCreate() {
  const { sitename } = useParams()

  const createCategory = async (formData) => {
    const properties = categoryForApi({ formData })
    return api.categories.create({
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: createCategory,
    redirectTo: `/${sitename}/dashboard/edit/categories`,
    queryKeyToInvalidate: [CATEGORIES, sitename],
    actionWord: 'created',
    type: 'category',
  })

  const onSubmit = (formData) => mutation.mutate(formData)

  return { onSubmit }
}

export function useCategoryUpdate() {
  const { sitename } = useParams()

  const updateCategory = async (formData) => {
    const properties = categoryForApi({ formData })
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

  const onSubmit = (formData) => mutation.mutate(formData)
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
