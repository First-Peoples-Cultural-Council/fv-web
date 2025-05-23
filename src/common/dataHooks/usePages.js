import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

// FPCC
import { PAGES } from 'common/constants'
import api from 'services/api'
import { getCustomPageHref } from 'common/utils/urlHelpers'
import {
  widgetListAdaptor,
  pageInfoAdaptor,
  pageCreateAdaptor,
} from 'common/dataAdaptors'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'

export function usePage({ pageSlug }) {
  const { sitename } = useParams()
  const response = useQuery({
    queryKey: [PAGES, sitename, pageSlug],
    queryFn: () => api.pages.get({ sitename, slug: pageSlug }),
    ...{ enabled: !!pageSlug },
  })

  const widgets = response?.data?.widgets
    ? widgetListAdaptor({
        widgetList: response?.data?.widgets,
        sitename,
      })
    : null

  return { ...response, data: { ...response?.data, widgets } }
}

export function usePages() {
  const { sitename } = useParams()

  const response = useQuery({
    queryKey: [PAGES, sitename],
    queryFn: () => api.pages.getAll({ sitename }),
    ...{ enabled: !!sitename },
  })

  const formattedPages = response?.data?.results?.map((page) => ({
    id: page?.id,
    title: page?.title,
    subtitle: page?.subtitle,
    url: page?.slug,
    href: getCustomPageHref({
      sitename,
      pageSlug: page?.slug,
    }),
  }))

  return { ...response, data: { ...response?.data, results: formattedPages } }
}

export function usePageCreate() {
  const { sitename } = useParams()

  const createPage = async (formData) => {
    const properties = pageCreateAdaptor({ formData })
    return api.pages.create({
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: createPage,
    redirectTo: `/${sitename}/dashboard/edit/pages`,
    queryKeyToInvalidate: [PAGES, sitename],
    actionWord: 'created',
    type: 'page',
  })

  const onSubmit = (formData) => mutation.mutate(formData)

  return { onSubmit }
}

export function usePageInfoUpdate() {
  // update the page details (title, etc) but not the widget list
  const { sitename } = useParams()

  const updatePage = async (formData) => {
    const properties = pageInfoAdaptor({ formData })
    return api.pages.partialUpdate({
      slug: formData?.slug, // note: assumes the form does not allow editing the slug
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updatePage,
    redirectTo: `/${sitename}/dashboard/edit/pages`,
    queryKeyToInvalidate: [PAGES, sitename],
    actionWord: 'updated',
    type: 'page',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}

export function usePageWidgetsUpdate({ pageSlug }) {
  // update the widget list but not the other page details
  const { sitename } = useParams()
  const updatePage = async (formData) => {
    const properties = {
      widgets: formData?.widgets,
    }
    return api.pages.partialUpdate({
      slug: pageSlug,
      sitename,
      properties,
    })
  }
  const mutation = useMutationWithNotification({
    mutationFn: updatePage,
    queryKeyToInvalidate: [PAGES, sitename],
    actionWord: 'updated',
    type: 'page widget list',
  })
  const onSubmit = (formData) => mutation.mutate(formData)
  return { onSubmit }
}

export function usePageDelete() {
  const { sitename } = useParams()
  const deletePage = async (slug) =>
    api.pages.delete({
      slug,
      sitename,
    })

  const mutation = useMutationWithNotification({
    mutationFn: deletePage,
    redirectTo: `/${sitename}/dashboard/edit/pages`,
    queryKeyToInvalidate: [PAGES, sitename],
    actionWord: 'deleted',
    type: 'page',
  })
  const onSubmit = (pageSlug) => {
    mutation.mutate(pageSlug)
  }
  return { onSubmit }
}
