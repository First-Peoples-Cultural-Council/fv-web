import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

// FPCC
import { SITES } from 'common/constants'
import api from 'services/api'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import { selectOneMediaFormHelper } from 'common/utils/mediaHelpers'
import { siteAdaptor } from 'common/dataAdaptors'
import { useSiteDispatch } from 'context/SiteContext'

export function useSite() {
  const { sitename } = useParams()
  const queryResponse = useQuery({
    queryKey: [SITES, sitename],
    queryFn: () => api.sites.get({ sitename }),
    select: (data) => siteAdaptor({ siteData: data }),
    enabled: !!sitename,
  })

  return queryResponse
}

export function useSites({ pageSize = 100 }) {
  const queryResponse = useQuery({
    queryKey: [SITES, pageSize],
    queryFn: () => api.sites.getAll({ pageSize }),
  })

  return queryResponse
}

export function useSiteUpdateBanner() {
  const { sitename } = useParams()
  const siteDispatch = useSiteDispatch()

  const updateBanner = async (formData) => {
    const bannerObject = selectOneMediaFormHelper(formData?.banner)
    const properties = {
      logo: formData?.logoArray?.[0]?.id || null,
      bannerImage: bannerObject?.imageId || null,
      bannerVideo: bannerObject?.videoId || null,
    }
    return api.sites.partialUpdate({
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updateBanner,
    redirectTo: `/${sitename}/dashboard/edit/home`,
    queryKeyToInvalidate: [SITES, sitename],
    actionWord: 'updated',
    type: 'site',
    onSuccessCallback: (response) => {
      const formattedSiteData = siteAdaptor({ siteData: response })
      siteDispatch({
        type: 'SET',
        data: formattedSiteData,
      })
    },
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}

export function useSiteUpdateWidgets() {
  const { sitename } = useParams()
  const siteDispatch = useSiteDispatch()

  const updateWidgets = async (formData) => {
    const properties = {
      homepage: formData?.widgets || [],
    }
    return api.sites.partialUpdate({
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updateWidgets,
    queryKeyToInvalidate: [SITES, sitename],
    actionWord: 'updated',
    type: 'Home page widgets',
    onSuccessCallback: (response) => {
      const formattedSiteData = siteAdaptor({ siteData: response })
      siteDispatch({
        type: 'SET',
        data: formattedSiteData,
      })
    },
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}
