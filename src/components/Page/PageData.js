import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { usePage } from 'common/dataHooks/usePages'
import { IMAGE, VIDEO } from 'common/constants'

function PageData({ url }) {
  const { site } = useSiteStore()
  const { logoPathMedium } = site
  const { pageUrl, sitename } = useParams()
  const navigate = useNavigate()

  const urlToUse = url || pageUrl

  // Data fetch
  const { data, error, isError, isFetched } = usePage({
    pageSlug: pageUrl,
  })

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  let backgroundType = null
  let background = null

  if (data?.bannerImage) {
    backgroundType = IMAGE
    background = data?.bannerImage
  } else if (data?.bannerVideo) {
    backgroundType = VIDEO
    background = data?.bannerVideo
  }

  return {
    notFound: !!(isFetched && data?.length === 0),
    banner: {
      background,
      backgroundType,
      logoPath:
        urlToUse === 'our-language' || urlToUse === 'our-people'
          ? logoPathMedium
          : null,
    },
    widgets: data?.widgets || [],
    title: data?.title,
    subtitle: data?.subtitle,
  }
}

export default PageData
