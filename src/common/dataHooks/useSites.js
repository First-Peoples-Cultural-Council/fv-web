import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { SITES } from 'common/constants'
import api from 'services/api'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import { selectOneMediaFormHelper } from 'common/utils/mediaHelpers'
import { siteAdaptor, languagesListAdaptor } from 'common/dataAdaptors'

export function useSite() {
  const { sitename } = useParams()
  const response = useQuery(
    [SITES, sitename],
    () => api.site.get({ sitename }),
    {
      // The query will not execute until the sitename exists
      enabled: !!sitename,
    },
  )
  const formattedSiteData = siteAdaptor({ siteData: response?.data || [] })

  return { ...response, data: formattedSiteData }
}

export function useSites() {
  const allSitesResponse = useQuery([SITES], () => api.site.getSites())
  const formattedSitesData = languagesListAdaptor({
    languagesData: allSitesResponse?.data,
  })

  return {
    ...allSitesResponse,
    allSitesData: formattedSitesData,
  }
}

export function useSiteUpdate() {
  const { sitename } = useParams()
  const updatePage = async (formData) => {
    const bannerObject = selectOneMediaFormHelper(formData, 'banner')
    const properties = {
      id: formData.id,
      logo: formData.logo || null,
      bannerImage: bannerObject.imageId || null,
      bannerVideo: bannerObject.videoId || null,
      homepage: formData.homepage || [],
    }
    return api.site.update({
      slug: formData?.slug,
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updatePage,
    redirectTo: `/${sitename}/dashboard/edit/pages`,
    queryKeyToInvalidate: [SITES, sitename],
    actionWord: 'updated',
    type: 'site',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}

export function useSiteUpdateBanner() {
  const { sitename } = useParams()
  const updatePage = async (formData) => {
    const bannerObject = selectOneMediaFormHelper(formData, 'banner')
    const properties = {
      id: formData?.id,
      logo: formData?.logoId || null,
      bannerImage: bannerObject?.imageId || null,
      bannerVideo: bannerObject?.videoId || null,
    }
    return api.site.partialUpdate({
      slug: formData?.slug,
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updatePage,
    redirectTo: `/${sitename}/dashboard/edit/pages`,
    queryKeyToInvalidate: [SITES, sitename],
    actionWord: 'updated',
    type: 'site',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}
