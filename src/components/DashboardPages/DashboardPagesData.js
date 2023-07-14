import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { getCustomPageHref } from 'common/utils/urlHelpers'
import api from 'services/api'

function DashboardPagesData() {
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const { sitename } = useParams()

  // Data fetch
  const { data, error, isError, isLoading } = useQuery(
    ['pages', site?.uid],
    () => api.page.getPages(site?.uid),
    {
      // The query will not execute until the uid exists
      enabled: !!site?.uid,
    },
  )

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  const tileContent = [
    {
      icon: 'Home',
      name: 'Edit Homepage',
      description: 'Edit the main homepage for your site',
      href: `/${sitename}/dashboard/edit/home`,
      iconColor: 'wordText',
      auth: 'Admin',
    },
    {
      icon: 'Create',
      name: 'Create a Custom Page',
      description: 'Add a new page to your site',
      href: `/${sitename}/dashboard/create/page`,
      iconColor: 'wordText',
      auth: 'Admin',
    },
  ]

  const headerContent = {
    title: 'Pages',
    subtitle: 'Edit your site homepage and manage custom pages.',
    icon: 'WebPages',
  }

  const pagesDataAdaptor = (dataArray) => {
    const pagesData = []
    dataArray.forEach((page) => {
      pagesData.push({
        id: page?.id,
        title: page?.title,
        subtitle: page?.description,
        url: page?.url,
        href: getCustomPageHref({
          sitename: site?.sitename,
          pageUrl: page?.url,
        }),
        page,
      })
    })
    return pagesData
  }

  return {
    headerContent,
    isLoading: isLoading || isError,
    site,
    sitename,
    tileContent,
    customPages: data?.length > 0 ? pagesDataAdaptor(data) : [],
  }
}

export default DashboardPagesData
