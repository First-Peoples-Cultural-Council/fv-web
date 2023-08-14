import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { PAGES } from 'common/constants'
import api from 'services/api'
import { getCustomPageHref } from 'common/utils/urlHelpers'
import { widgetListAdaptor } from 'common/dataAdaptors'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'

export function usePage({ pageSlug }) {
  const { sitename } = useParams()
  const response = useQuery(
    [PAGES, sitename, pageSlug],
    () => api.pages.getPage({ sitename, pageSlug }),
    { enabled: !!pageSlug },
  )

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

  const response = useQuery(
    [PAGES, sitename],
    () => api.pages.getPages({ sitename }),
    { enabled: !!sitename },
  )

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
    const properties = {
      title: formData?.title || null,
      visibility: formData?.visibility,
      subtitle: formData?.subtitle || null,
      slug: formData?.url || null,
      widgets: formData?.widgets || [],
      bannerImage: formData?.banner_image || null,
      bannerVideo: formData?.banner_video || null,
    }
    return api.pages.create({
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: createPage,
    redirectTo: `/${sitename}/dashboard/edit/pages`,
    queryKey: [PAGES, sitename],
    actionWord: 'created',
    type: 'page',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}

export function usePageUpdate() {
  const { sitename } = useParams()

  console.log('updated')

  const updatePage = async (formData) => {
    const properties = {
      title: formData?.title || null,
      visibility: formData?.visibility,
      subtitle: formData?.subtitle || null,
      slug: formData?.url || null,
      widgets: formData?.widgets || [],
      bannerImage: formData?.banner_image || null,
      bannerVideo: formData?.banner_video || null,
    }
    return api.pages.update({
      slug: formData?.url,
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

export function usePageDelete() {
  const { sitename } = useParams()
  const deletePage = async (pageSlug) =>
    api.pages.delete({
      pageSlug,
      sitename,
    })

  const mutation = useMutationWithNotification({
    mutationFn: deletePage,
    redirectTo: `/${sitename}/dashboard/edit/page`,
    queryKeyToInvalidate: [PAGES, sitename],
    actionWord: 'deleted',
    type: 'page',
  })
  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}
